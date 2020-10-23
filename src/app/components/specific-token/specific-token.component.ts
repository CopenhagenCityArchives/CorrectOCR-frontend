import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';

@Component({
  selector: 'app-specific-token',
  templateUrl: './specific-token.component.html',
  styleUrls: ['./specific-token.component.scss']
})
export class SpecificTokenComponent implements OnInit {
  public mainToken$: Observable<Object>;
  public tokenIndex: any;
  public docId: any;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      if(params.has('token-index')) {
        this.tokenIndex = params.get('token-index');
      }
      if (params.has('docid')) {
        this.docId = params.get('docid');
      }
        let response = await this.getSpecificToken(this.docId, this.tokenIndex);
        this.mainToken$ = response;
      })
    }

  getSpecificToken(docId: number, tokenIndex: number) {
    return this.apiService.getToken(docId, tokenIndex).pipe(share())
  }

  redirectToUrl() {
    this.router.navigate(['/']);
  }

}
