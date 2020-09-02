import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../API/api.service';
@Component({
  selector: 'app-doc-overview',
  templateUrl: './doc-overview.component.html',
  styleUrls: ['./doc-overview.component.scss']
})
export class DocOverviewComponent implements OnInit {
  private apiService: ApiService;
  public documentList;

  constructor(service: ApiService) { 
    this.apiService = service;
  }

   ngOnInit() {
    this.apiService.getOverview().subscribe((data) => {
      this.documentList = data;
    })
   }

}
