import { Component, OnInit, Input } from '@angular/core';
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
  @Input() promise?: Promise<Object>;
  @Input() urlList?: Array<Object>;
  index: number = 0;
  mainToken: Token;
  leftToken: Token;
  rightToken: Token;
  response;
  constructor(private route: ActivatedRoute, private ApiService: ApiService) {
   
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.urlList) {
      console.log("urlList", this.urlList);
      this.getTokens();
    }
  }

  getTokens(): void {
    console.log("hit")
    this.route.paramMap.subscribe(params => {
      this.ApiService.getTokenFromInfoUrl(this.urlList[this.index]['info_url']).subscribe((data: JSON) => {
        console.log(new Token(data));
        this.mainToken = new Token(data);

        this.ApiService.getLeftToken(this.mainToken).subscribe((data: JSON) => {
          this.leftToken = new Token(data);
        })
  
        this.ApiService.getRightToken(this.mainToken).subscribe((data: JSON) => {
          this.rightToken = new Token(data);
        })
      })
    })
    this.index ++;
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
    this.getTokens();
  }

}
