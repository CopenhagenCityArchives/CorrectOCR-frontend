import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../API/api.service';
import { Token } from '../tokens/token';

@Component({
  selector: 'app-doc-tokens',
  templateUrl: './doc-tokens.component.html',
  styleUrls: ['./doc-tokens.component.scss']
})
export class DocTokensComponent implements OnInit {
  url = 'http://localhost:5000';

  tokenList:Array<object> = new Array;
  correctedList:Array<object> = new Array;
  uncorrectedList:Array<object> = new Array;

  mainToken: Token;
  leftToken: Token;
  rightToken: Token;
  response;
  constructor(private route: ActivatedRoute, private ApiService: ApiService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      await this.ApiService.getAllTokensFromDocId(params.get("docid")).toPromise().then((data: Array<object>) => {
        this.tokenList = data;

        console.log("tokenList loaded");
        this.tokenList.map((token) => {
          if(token['is_corrected']) {
            this.correctedList.push(token);
          } else {
            this.uncorrectedList.push(token);
          }
        })
        console.log("total num:", this.tokenList.length);
        console.log("corrected:", this.correctedList.length);
        console.log("uncorrected:", this.uncorrectedList.length);
        
        this.getTokens();

      })
    //this.getTokens();
    })
  }

  getTokens(): void {

    console.log(this.uncorrectedList[0]);

    this.ApiService.getTokenFromInfoUrl(this.uncorrectedList[0]['info_url']).subscribe((data: JSON) => {
      console.log(new Token(data));
      this.mainToken = new Token(data);

      this.ApiService.getLeftToken(this.mainToken).subscribe((data: JSON) => {
        this.leftToken = new Token(data);
      });

      this.ApiService.getRightToken(this.mainToken).subscribe((data: JSON) => {
        this.rightToken = new Token(data);
      })
    })
  }

  correct(gold:string): void {
    this.ApiService.postGold(this.mainToken, gold).subscribe((data: JSON) => {
      this.response = new Token(data);
      console.log(this.response);
    })
    this.nextToken();
  }

  hypLeft(): void {
   this.ApiService.postHypernate(this.mainToken, 'left').subscribe((data: JSON) => {
      this.response = new Token(data);
      console.log(this.response);
    })
    this.nextToken();
  }

  hypRight(): void {
    this.ApiService.postHypernate(this.mainToken, 'right').subscribe((data: JSON) => {
      this.response = new Token(data);
      console.log(this.response);
    })
    this.nextToken();
  }

  nextToken(): void {
    this.getTokens();
  }

}
