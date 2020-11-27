import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-specific-token',
  templateUrl: './specific-token.component.html',
  styleUrls: ['./specific-token.component.scss']
})
export class SpecificTokenComponent implements OnInit {
  public mainToken$: Observable<Object>;
  public tokenIndex: any;
  public docId: any;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      if (params.keys.length === 0 ) {
        return;
      }
      if(params.has('tokenindex') && params.has('docid')) {
        this.tokenIndex = params.get('tokenindex');
        this.docId = params.get('docid');

        let response = await this.getSpecificToken(this.docId, this.tokenIndex);
        this.mainToken$ = response;
      } else {
        catchError(() => {
          let err = new Error(`Invalid params, should be [docid,tokenindex] but recieved: [${params.keys.toString()}]`);
          console.error(err.message)
          throw err;
        })
      }
    })
  }

  getSpecificToken(docId: number, tokenIndex: number) {
    return this.apiService.getToken(docId, tokenIndex).pipe(share())
  }

  redirectToUrl() {
    this.location.back();
  }

}
