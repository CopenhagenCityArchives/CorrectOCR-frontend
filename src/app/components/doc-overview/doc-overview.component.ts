import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApiService } from '../../API/api.service';
@Component({
  selector: 'app-doc-overview',
  templateUrl: './doc-overview.component.html',
  styleUrls: ['./doc-overview.component.scss']
})
export class DocOverviewComponent implements OnInit {
  private apiService: ApiService;
  public documentList$: Observable<object>;

  public specificDocId: string;
  public specificTokenIndex: string;

  constructor(service: ApiService, private router: Router) { 
    this.apiService = service;
  }

  ngOnInit() {
  this.documentList$ = this.apiService.getOverview().pipe(share());
  }
  
  redirectToToken() {
  this.router.navigate([`/tokens/${this.specificDocId}/${this.specificTokenIndex}`]);
  }

}
