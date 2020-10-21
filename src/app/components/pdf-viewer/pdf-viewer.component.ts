import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/API/api.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @Input() public src: string;
  @Input() public page: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }


}
