import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer, forkJoin, Observable, pipe, Subscription } from 'rxjs';
import { catchError, map, retry, share, endWith, finalize, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';
import { Token } from '../tokens/token';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})

export class TokensComponent implements OnChanges {
  public url: string = environment.apiUrl;
  public documentSrc: string;
  private apiService: ApiService;

  @Input() public docTotal?: number;
  @Input() public docCorrected?: number;
  public sessionCorrected: number;

  @Input() public mainToken$: Observable<any>;
  @Output() public getNextMainToken = new EventEmitter();

  public mainToken: Token;
  public leftToken$: Observable<any>
  public rightToken$: Observable<any>;
  
  public andetInputField: string;
  public toggleMetadata: boolean;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit(): void {
    this.toggleMetadata = false;
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

  public async correct(correction:string, hypDir?:string): Promise<void> {
    let response: any;
    if (hypDir) {
      response = await this.apiService.postGoldAndHypernate(this.mainToken, correction, hypDir).toPromise().then((data:JSON) => new Token(data));
    } else {
      response = await this.apiService.postGold(this.mainToken, correction).toPromise().then((data:JSON) => new Token(data));
    }
    console.log("correct Response", response);
    this.nextToken();
  }

  public async hypLeft(): Promise<void> {
    let response = await this.apiService.postHypernate(this.mainToken, 'left').toPromise().then((data:JSON) => new Token(data));
    console.log("hypLeft response", response);
    this.nextToken();
  }

  public async hypRight(): Promise<void> {
    let response = await this.apiService.postHypernate(this.mainToken, 'right').toPromise().then((data: JSON) => new Token(data));
    console.log("hypRight response", response);
    this.nextToken();
  }

  public async refreshToken(): Promise<void> {
    let response = this.apiService.getToken(this.mainToken.doc_ID, this.mainToken.index).pipe(share());
    await this.setupTokens(response);
  }

  public async discardToken(): Promise<void> {
    let response = await this.apiService.discardToken(this.mainToken).toPromise().then((data: JSON) => new Token(data));
    console.log("discarded response", response);
    this.nextToken();
  }

  async setDocumentUrl() {
    this.documentSrc = String(this.mainToken.doc_ID) + '.pdf';
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
}