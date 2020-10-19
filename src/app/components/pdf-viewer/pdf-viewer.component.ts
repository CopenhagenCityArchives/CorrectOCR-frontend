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

  public zoomValue: number = 1;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    console.log(this.src);
  }

  public zoomIn() {
    if(this.zoomValue <= 1.9) {
      this.zoomValue += 0.2;
    }
    console.log(this.zoomValue)
  }

  public zoomOut() {
    if(this.zoomValue >= 0.3) {
      this.zoomValue -= 0.2
    }
    console.log(this.zoomValue)
  }

  public async getPdf() {
    let response = await this.apiService.getPdf('https://api.kbharkiv.dk/asset/6148');
    console.log(response);
  }

}
