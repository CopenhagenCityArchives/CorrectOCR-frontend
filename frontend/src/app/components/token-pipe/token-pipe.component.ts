import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer, forkJoin, Observable, pipe } from 'rxjs';
import { catchError, map, retry, share, endWith, finalize, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';
import { Token } from '../tokens/token';

@Component({
  selector: 'app-token-pipe',
  templateUrl: './token-pipe.component.html',
  styleUrls: ['./token-pipe.component.scss']
})
export class TokenPipeComponent implements OnChanges {
  public url = 'http://localhost:5000';
  private apiService: ApiService;

  @Input() public mainToken$: Observable<Token>;
  @Output() public getNextMainToken = new EventEmitter();

  public testObs$: Observable<any>;
  public leftToken$: Observable<any>
  public rightToken$: Observable<any>;
  public mergeMap: Observable<any>;
  public mainToken: Token;
  public leftToken: Token;
  public rightToken: Token;

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
        // changes.mainToken$.currentValue.pipe(share(), map((value:JSON) => this.mainToken = new Token(value)), this.getTokens())
        const changeObs:Observable<any> = changes.mainToken$.currentValue.pipe(share());
        this.leftToken$ = changeObs.pipe(share(), mergeMap((mainToken:JSON) => this.apiService.getLeftToken(new Token(mainToken))));
        this.rightToken$ = changeObs.pipe(share(), mergeMap((mainToken:JSON) => this.apiService.getRightToken(new Token(mainToken))));
        this.getTokens();
      }
    }
  }

  getTokens(): void {
    forkJoin([this.mainToken$, this.leftToken$, this.rightToken$]).subscribe(results => {
      console.log(results);
      this.mainToken = new Token(JSON.parse(JSON.stringify(results[0])));
      this.leftToken = new Token(JSON.parse(JSON.stringify(results[1])));
      this.rightToken = new Token(JSON.parse(JSON.stringify(results[2])));
      console.log(this.mainToken);
      console.log(this.leftToken);
      console.log(this.rightToken);
    })
    // this.mainToken$.subscribe((data) => console.log("mainToken$", data));
    // this.leftToken$.subscribe((data) => console.log("leftToken$", data));
    // this.rightToken$.subscribe((data) => console.log("rightToken$", data));

    //let tempToken 
    //this.leftToken$ = this.apiService.getLeftToken(this.mainToken).pipe(share());
    //this.rightToken$ = this.apiService.getRightToken(this.mainToken).pipe(share());
  }

  correct(correction:string): void {
    // console.log(correction);
    // this.apiService.postGold(this.mainToken, correction).toPromise().then((data: JSON) => {
    //   this.response = new Token(data);
    //   console.log(this.response);
    // })
    this.nextToken();
  }

  hypLeft(): void {
  //  this.apiService.postHypernate(this.mainToken, 'left').toPromise().then((data: JSON) => {
  //     this.response = new Token(data);
  //     console.log(this.response);
  //   })
  //   this.nextToken();
  }

  hypRight(): void {
    // this.apiService.postHypernate(this.mainToken, 'right').toPromise().then((data: JSON) => {
    //   this.response = new Token(data);
    //   console.log(this.response);
    // })
    // this.nextToken();
  }

  nextToken(): void {
    this.andetInputField = '';
    this.getNextMainToken.emit();
  }

}

