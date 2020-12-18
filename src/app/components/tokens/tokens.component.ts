import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { share, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';
import { Token } from '../tokens/token';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})

export class TokensComponent implements OnChanges {
  public url: string = environment.apiUrl;
  public documentSrc: string;
  private apiService: ApiService;
  private authService: AuthService;

  @Input() public docTotal?: number;
  @Input() public docCorrected?: number;
  @Input() public modelCorrected?: number;
  public sessionCorrected: number;

  @Input() public mainToken$: Observable<any>;
  @Output() public getNextMainToken = new EventEmitter();
  @Output() public getPrevMainToken = new EventEmitter();

  public mainToken: Token;
  public leftToken$: Observable<any>
  public rightToken$: Observable<any>;
  public andetInputField: string;
  public toggleMetadata: boolean;

  hypDir: string;
  checkForm: FormGroup;
  profile$: Observable<any>;
  userData: any;

  constructor(apiService: ApiService, authService: AuthService, private router: Router) {
    this.apiService = apiService;
    this.router = router;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.toggleMetadata = false;
    this.checkForm = new FormGroup({
      leftCheck: new FormControl(''),
      rightCheck: new FormControl('')
    });
    this.getUserInfo();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('mainToken$')) {
      if(changes.mainToken$.currentValue != null) {
        const changes$:Observable<any> = changes.mainToken$.currentValue.pipe(share());
        await this.setupTokens(changes$);
        this.setDocumentUrl();
      }
      return
    }
    return
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      if (e.target.value == 'left') {
        this.checkForm.controls['rightCheck'].setValue(false);
        this.hypDir = 'left';
      } else if(e.target.value == 'right'){
        this.checkForm.controls['leftCheck'].setValue(false);
        this.hypDir = 'right';
      }
    }
  }

  public async setupTokens(mainToken$: Observable<any>) {
    this.mainToken$ = mainToken$;
    const changes$:Observable<any> = mainToken$.pipe(share());
    this.leftToken$ = changes$.pipe(mergeMap((mainToken:JSON) => this.apiService.getLeftToken(new Token(mainToken))), share());
    this.rightToken$ = changes$.pipe(mergeMap((mainToken:JSON) => this.apiService.getRightToken(new Token(mainToken))), share());
    let token = await changes$.toPromise().then((data:JSON) => new Token(data));
    this.initCounter(token.doc_ID);
    this.mainToken = token;
  }

  nextToken(): void {
    this.clearInputFields();
    this.getNextMainToken.emit();
    this.updateCounter(this.mainToken.doc_ID);
  }

  skipToken(): void {
    this.clearInputFields();
    this.getNextMainToken.emit();
  }

  prevToken(): void {
    this.clearInputFields();
    this.getPrevMainToken.emit();
  }

  makeMainToken(doc_id: number, token_index: number): void {
    this.router.navigate([`/tokens/${doc_id}/${token_index}`]);
  }

  public async correct(correction:string): Promise<void> {
    let response: any;
    if (this.hypDir) {
      response = await this.apiService.postGoldAndHypernate(this.mainToken, correction, this.hypDir, this.userData).toPromise().then((data:JSON) => new Token(data));
    } else {
      response = await this.apiService.postGold(this.mainToken, correction, this.userData).toPromise().then((data:JSON) => new Token(data));
    }
    console.log("correct Response", response);
    this.nextToken();
  }

  public async hypLeft(): Promise<void> {
    let response = await this.apiService.postHypernate(this.mainToken, 'left', this.userData).toPromise().then((data:JSON) => new Token(data));
    console.log("hypLeft response", response);
    this.nextToken();
  }

  public async hypRight(): Promise<void> {
    let response = await this.apiService.postHypernate(this.mainToken, 'right', this.userData).toPromise().then((data: JSON) => new Token(data));
    console.log("hypRight response", response);
    this.nextToken();
  }

  public async refreshToken(): Promise<void> {
    let response = this.apiService.getToken(this.mainToken.doc_ID, this.mainToken.index).pipe(share());
    await this.setupTokens(response);
  }

  public async discardToken(): Promise<void> {
    let response = await this.apiService.discardToken(this.mainToken, this.userData).toPromise().then((data: JSON) => new Token(data));
    console.log("discarded response", response);
    this.nextToken();
  }

  async setDocumentUrl() {
    this.documentSrc = `${environment.documentBaseUrl}${this.mainToken.doc_ID}`;
  }

  public initCounter(doc_id: number): void {
    const value = parseInt(localStorage.getItem(`corrected-${doc_id}`));
    if(!value || value < 0) {
      localStorage.setItem(`corrected-${doc_id}`, '0');
      this.sessionCorrected = 0;
    }
    this.sessionCorrected = value;
  }

  public updateCounter(doc_id: number): void {
    let value = parseInt(localStorage.getItem(`corrected-${doc_id}`));
    value++
    this.sessionCorrected = value;
    localStorage.setItem(`corrected-${doc_id}`, value.toString());
  }

  public clearInputFields(): void {
    this.andetInputField = '';
  }

  public async getUserInfo(): Promise<void> {
    let userData;
    this.profile$ = await this.authService.userProfile$.pipe(share());
    this.profile$.subscribe((data) => userData = JSON.stringify({"nickname": data.nickname, "APACS": data["https://kbharkiv.dk/claims/apacs_user_id"] }));
    this.userData = userData;
  }
}