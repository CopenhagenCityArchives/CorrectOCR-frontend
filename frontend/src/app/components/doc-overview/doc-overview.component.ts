import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../API/api.service';
@Component({
  selector: 'app-doc-overview',
  templateUrl: './doc-overview.component.html',
  styleUrls: ['./doc-overview.component.scss']
})
export class DocOverviewComponent implements OnInit {

  documentList;

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.ApiService.getOverview().subscribe((data) => {
      this.documentList = data;
    });
  }

}
