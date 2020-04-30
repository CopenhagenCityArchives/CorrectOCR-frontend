import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokensService } from '../tokens.service';
import { ApiService } from '../api.service';
import { Token } from '../tokens/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  url = 'http://localhost:5000';
  conn: Subscription;
  mainToken: Token;
  leftToken: Token;
  rightToken: Token;
  response;
  constructor(private route: ActivatedRoute, private TokensService: TokensService, private ApiService: ApiService) {
   
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ApiService.getRandomToken().subscribe((data) => {
        this.mainToken = new Token(data);

        this.ApiService.getLeftToken(this.mainToken).subscribe((data) => {
          this.leftToken = new Token(data);
        });
  
        this.ApiService.getRightToken(this.mainToken).subscribe((data) => {
          this.rightToken = new Token(data);
        });
      });

    }).unsubscribe();

  }

  accept(): void {
    window.alert('Accept main token...');
  }

  correct(correction): void {
    let gold;
    switch (correction) {
      case 1:
        gold = this.mainToken.firstBest;
        break;
      case 2:
        gold = this.mainToken.secondBest;
        break;
      case 3:
        gold = this.mainToken.thirdBest
        break;
      default:
        break;
    }
    
    this.ApiService.postGold(this.mainToken, gold).subscribe((data => {
      this.response = new Token(data);
      console.log(this.response);
    }))
  }

  hypLeft(): void {
   this.ApiService.postHypernate(this.mainToken, 'left').subscribe((data => {
      this.response = new Token(data);
      console.log(this.response);
    }))
  }

  hypRight(): void {
    let response = this.ApiService.postHypernate(this.mainToken, 'right').subscribe((data => {
      this.response = new Token(data);
      console.log(this.response);
    }))
  }

}
