import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';
import { Token } from '../tokens/token';

@Component({
  selector: 'app-doc-tokens-pipe',
  templateUrl: './doc-tokens-pipe.component.html',
  styleUrls: ['./doc-tokens-pipe.component.scss']
})
export class DocTokensPipeComponent implements OnInit {
  public tokenList:Array<object> = new Array;
  public correctedList:Array<object>;
  public uncorrectedList:Array<object>;
  public index: number = 0;

  public mainToken$: Observable<Object>;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      if(params.has("docid")) {
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
      }
    })
  }

  public getNextTokenFromList() {
    this.mainToken$ = this.apiService.getTokenFromInfoUrl(this.uncorrectedList[this.index]['info_url']).pipe(share());
    this.index++;
  }
}