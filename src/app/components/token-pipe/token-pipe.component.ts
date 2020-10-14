import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer, forkJoin, Observable, pipe, Subscription } from 'rxjs';
import { catchError, map, retry, share, endWith, finalize, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';
import { Token } from '../tokens/token';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-token-pipe',
  templateUrl: './token-pipe.component.html',
  styleUrls: ['./token-pipe.component.scss']
})
export class TokenPipeComponent implements OnChanges {
  public url: string = environment.apiUrl;
  public documentSrc: string;
  private apiService: ApiService;

  @Input() public mainToken$: Observable<any>;
  @Output() public getNextMainToken = new EventEmitter();

  public mainToken: Token;
  public leftToken$: Observable<any>
  public rightToken$: Observable<any>;
  
  public andetInputField: string;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit(): void {

  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('mainToken$')) {
      if(changes.mainToken$.currentValue != null) {
        const changes$:Observable<any> = changes.mainToken$.currentValue.pipe(share());
        this.leftToken$ = changes$.pipe(mergeMap((mainToken:JSON) => this.apiService.getLeftToken(new Token(mainToken))), share());
        this.rightToken$ = changes$.pipe(mergeMap((mainToken:JSON) => this.apiService.getRightToken(new Token(mainToken))), share());
        let token = await changes$.toPromise().then((data:JSON) => new Token(data));
        this.mainToken = token;
        this.setDocumentUrl();
      }
    }
  }

  public async correct(correction:string): Promise<void> {
    let response = await this.apiService.postGold(this.mainToken, correction).toPromise().then((data:JSON) => new Token(data));
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

  nextToken(): void {
    this.andetInputField = '';
    this.getNextMainToken.emit();
  }

  async setDocumentUrl() {
    this.documentSrc = environment.documentBaseUrl + this.mainToken.doc_ID;
  }
}