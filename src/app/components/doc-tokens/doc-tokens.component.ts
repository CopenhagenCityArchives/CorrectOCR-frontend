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
  public tokenList:Array<object> = new Array;
  public correctedList:Array<object>;
  public uncorrectedList:Array<object>;
  private index: number = 0;

  public mainToken: Token;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.apiService.getAllTokensFromDocId(params.get("docid")).subscribe((data: Array<object>) => {
        this.tokenList = data;
        let corrected: Array<Object> = new Array;
        let uncorrected: Array<object> = new Array;
        this.tokenList.map((token) => {
          if(token['is_corrected']) {
            corrected.push(token);
          } else {
            uncorrected.push(token);
          }
        });
        this.correctedList = corrected;
        this.uncorrectedList = uncorrected;
        
        this.getNextTokenFromList();

      })
    })
  }

  public getNextTokenFromList() {
    this.apiService.getTokenFromInfoUrl(this.uncorrectedList[this.index]['info_url']).subscribe((data: JSON) => {
      this.mainToken = new Token(data);
    })
    this.index++;
  }
}
