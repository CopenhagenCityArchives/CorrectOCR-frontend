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
  @Input() public frame: number[];
  public tokenFrame: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.frame);
    this.getTokenFrame();
  }

  private getTokenFrame() {
    let tokenFrame;
    const zoomLevel = "500";
    const xOffset = this.frame[0].toString();
    const yOffset = this.frame[1].toString();
    
    tokenFrame = `${zoomLevel},${xOffset},${yOffset}`;
    console.log("custom", tokenFrame);
    this.tokenFrame = tokenFrame;
  }


}
