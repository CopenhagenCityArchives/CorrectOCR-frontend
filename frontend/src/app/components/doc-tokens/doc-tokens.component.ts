import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../API/api.service';
import { Token } from '../tokens/token';
import { promise } from 'protractor';

@Component({
  selector: 'app-doc-tokens',
  templateUrl: './doc-tokens.component.html',
  styleUrls: ['./doc-tokens.component.scss']
})
export class DocTokensComponent implements OnInit {
  url = 'http://localhost:5000';

  promise: Promise<Object>;

  tokenList:Array<object> = new Array;
  correctedList:Array<object>;
  uncorrectedList:Array<object>;

  mainToken: Token;
  leftToken: Token;
  rightToken: Token;

  response;

  constructor(private route: ActivatedRoute, private ApiService: ApiService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      this.ApiService.getAllTokensFromDocId(params.get("docid")).toPromise().then((data: Array<object>) => {
        this.tokenList = data;

        console.log("tokenList loaded");
        let corrected: Array<Object> = new Array;
        let uncorrected: Array<object> = new Array;
        this.tokenList.map((token) => {
          if(token['is_corrected']) {
            corrected.push(token);
          } else {
            uncorrected.push(token);
          }
        })

        this.correctedList = corrected;
        this.uncorrectedList = uncorrected;

        console.log("total num:", this.tokenList.length);
        console.log("corrected:", this.correctedList.length);
        console.log("uncorrected:", this.uncorrectedList.length);

      })
    //this.getTokens();
    })
  }
}
