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
  private apiService: ApiService;
  public documentSrc: any = 'https://api.kbharkiv.dk/asset/6000';

  @Input() public mainToken$: Observable<any>;
  @Output() public getNextMainToken = new EventEmitter();

  public mainToken: Token;
  public leftToken$: Observable<any>
  public rightToken$: Observable<any>;
  
  private response: Token;
  public andetInputField: string;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('mainToken$')) {
      if(changes.mainToken$.currentValue != null) {
        const changes$:Observable<any> = changes.mainToken$.currentValue.pipe(share());
        this.leftToken$ = changes$.pipe(mergeMap((mainToken:JSON) => this.apiService.getLeftToken(new Token(mainToken))), share());
        this.rightToken$ = changes$.pipe(mergeMap((mainToken:JSON) => this.apiService.getRightToken(new Token(mainToken))), share());
        //this.setDocumentUrl();
      }
    }
  }

  correct(correction:string): void {
    console.log(correction);
    this.apiService.postGold(this.mainToken, correction).toPromise().then((data: JSON) => {
      this.response = new Token(data);
      console.log(this.response);
    })
    this.nextToken();
  }

  hypLeft(): void {
   this.apiService.postHypernate(this.mainToken, 'left').toPromise().then((data: JSON) => {
      this.response = new Token(data);
      console.log(this.response);
    })
    this.nextToken();
  }

  hypRight(): void {
    this.apiService.postHypernate(this.mainToken, 'right').toPromise().then((data: JSON) => {
      this.response = new Token(data);
      console.log(this.response);
    })
    this.nextToken();
  }

  nextToken(): void {
    this.andetInputField = '';
    this.getNextMainToken.emit();
  }

  setDocumentUrl(): void {
    let doc_ID: any;
    if (this.mainToken) {
      doc_ID = this.mainToken.doc_ID
    } else {
      this.mainToken$.subscribe((data:JSON) => doc_ID = data['Doc ID']);
    }
    console.log("docUrl: ", doc_ID);

    this.documentSrc = {
      url: environment.documentBaseUrl + doc_ID,
    }
  }
  
}

