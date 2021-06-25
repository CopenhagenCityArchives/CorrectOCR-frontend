import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';

@Component({
  selector: 'app-doc-tokens',
  templateUrl: './doc-tokens.component.html',
  styleUrls: ['./doc-tokens.component.scss']
})
export class DocTokensComponent implements OnInit {
  public mainToken$: Observable<Object>;
  public docId: string;
  public index: number = 0;

  public tokenList:Array<object> = new Array;
  public correctedList:Array<object>;
  public uncorrectedList:Array<object>;
  public tokenCount: number;
  public modelCorrected: number;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if(params.has("docid")) {
        this.docId = params.get("docid");
        let tokenList: Array<object>;
        let corrected: Array<object> = new Array;
        let uncorrected: Array<object> = new Array;
        let tokenCount: number;
        let modelCorrected: number;
        await this.apiService.getAllTokensFromDocId(params.get("docid")).toPromise().then((data:Array<object>) => tokenList = data);
        await this.apiService.getOverview().toPromise().then(
			(data:Array<object>) => {
				tokenCount = data.find(elm => elm['docid'] == this.docId)['count'];
				modelCorrected = data.find(elm => elm['docid'] == this.docId)['corrected_by_model'];
			}
		);
        
        tokenList.map((token) => {
          if(token['is_corrected'] || token['is_discarded'] == 1) {
            corrected.push(token);
          } else {
            uncorrected.push(token);
          }
        });

		this.tokenCount = tokenCount;
        this.tokenList = tokenList;
        this.correctedList = corrected;
        this.uncorrectedList = uncorrected;
        this.modelCorrected = modelCorrected
        this.getNextTokenFromList();
      }
    })
  }

  public getNextTokenFromList(hyp?: boolean) {
    if (hyp == true) {
      this.uncorrectedList.splice(this.index, 1);
    }
    if(this.index != this.uncorrectedList.length) {
      this.mainToken$ = this.apiService.getTokenFromInfoUrl(this.uncorrectedList[this.index]['info_url']).pipe(share());
      this.index++;
    }
  }

  public getPreviousTokenFromList() {
    if(this.index != 0) {
      this.index--;
      this.mainToken$ = this.apiService.getTokenFromInfoUrl(this.uncorrectedList[this.index-1]['info_url']).pipe(share());
    }
  }
}