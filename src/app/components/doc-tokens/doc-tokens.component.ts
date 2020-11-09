import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';
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
  public index: number = 0;
  public docProgress: object;
  public mainToken$: Observable<Object>;
  public docId: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if(params.has("docid")) {
        this.docId = params.get("docid")
        let getAllTokensPromise: Array<object>;
        let corrected: Array<object> = new Array;
        let uncorrected: Array<object> = new Array;
        await this.apiService.getAllTokensFromDocId(params.get("docid")).toPromise().then((data:Array<object>) => getAllTokensPromise = data);
        
        getAllTokensPromise.map((token) => {
          if(token['is_corrected']) {
            corrected.push(token);
          } else if (token['is_discarded'] === 0) {
            uncorrected.push(token);
          }
        });
        this.tokenList = getAllTokensPromise;
        this.correctedList = corrected;
        this.uncorrectedList = uncorrected;
        this.docProgress = {total: this.tokenList.length, corrected: this.correctedList.length}
        this.getNextTokenFromList();
      }
    })
  }

  public getNextTokenFromList() {
    this.mainToken$ = this.apiService.getTokenFromInfoUrl(this.uncorrectedList[this.index]['info_url']).pipe(share());
    this.index++;
  }
}