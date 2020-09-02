import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../API/api.service';
import { Token } from '../tokens/token';


@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  url = 'http://localhost:5000';

  @Input() public mainToken: Token;
  @Output() public getNextMainToken = new EventEmitter();

  public leftToken: Token;
  public rightToken: Token;

  private response: Token;
  public andetInputField: string = '';

  constructor(private route: ActivatedRoute, private ApiService: ApiService) {
   
  }

  ngOnInit(): void {

  }


  ngOnChanges() {
    if(this.mainToken){
      this.getTokens();
    }
    
  }

  getTokens(): void {
    this.route.paramMap.subscribe(params => {
      this.ApiService.getLeftToken(this.mainToken).toPromise().then((data: JSON) => {
        this.leftToken = new Token(data);
      })
      this.ApiService.getRightToken(this.mainToken).toPromise().then((data: JSON) => {
        this.rightToken = new Token(data);
      })
    })
  }

  correct(correction:string): void {
    console.log(correction);
    this.ApiService.postGold(this.mainToken, correction).toPromise().then((data: JSON) => {
      this.response = new Token(data);
      console.log(this.response);
    })
    this.nextToken();
  }

  hypLeft(): void {
   this.ApiService.postHypernate(this.mainToken, 'left').toPromise().then((data: JSON) => {
      this.response = new Token(data);
      console.log(this.response);
    })
    this.nextToken();
  }

  hypRight(): void {
    this.ApiService.postHypernate(this.mainToken, 'right').toPromise().then((data: JSON) => {
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
