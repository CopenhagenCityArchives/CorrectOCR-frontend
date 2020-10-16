import { Component, OnInit } from '@angular/core';
import { share } from 'rxjs/operators';
import { ApiService } from '../../API/api.service';
@Component({
  selector: 'app-doc-overview',
  templateUrl: './doc-overview.component.html',
  styleUrls: ['./doc-overview.component.scss']
})
export class DocOverviewComponent implements OnInit {
  private apiService: ApiService;
  public documentList$: any;

  constructor(service: ApiService) { 
    this.apiService = service;
  }

   ngOnInit() {
    this.documentList$ = this.apiService.getOverview().pipe(share());
   }

}
