import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../API/api.service';
import { Token } from '../tokens/token';


@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnChanges {
  public url = 'http://localhost:5000';
  private apiService: ApiService;

  @Input() public mainToken: Token
  @Output() public getNextMainToken = new EventEmitter();

  public leftToken: Token;
  public rightToken: Token;

  private response: Token;
  public andetInputField: string = '';

  constructor(apiService: ApiService) {
   this.apiService = apiService;
  }

  ngOnInit(): void {
  }
 

  ngOnChanges(changes: SimpleChanges) {
    console.log("onChanges", changes);
 
    if (changes.hasOwnProperty('mainToken')) {
      this.mainToken = changes.mainToken.currentValue;
      this.getTokens();
    }
  }

  getTokens(): void {
    console.log("hit");
    this.apiService.getLeftToken(this.mainToken).toPromise().then((data: JSON) => {
      this.leftToken = new Token(data);
    })
    this.apiService.getRightToken(this.mainToken).toPromise().then((data: JSON) => {
      this.rightToken = new Token(data);
    })
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

}
