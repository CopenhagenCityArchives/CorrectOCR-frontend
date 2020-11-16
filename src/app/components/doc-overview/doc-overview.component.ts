import { Component, OnInit } from '@angular/core';
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

  constructor(service: ApiService) { 
    this.apiService = service;
  }

  async ngOnInit() {
    let documentList$ = await this.apiService.getOverview().pipe(share());
    this.documentList$ = documentList$;


  }

  public async getDocumentList(): Promise<Observable<Object>> {
    return this.apiService.getOverview().pipe(share());
  }

}
