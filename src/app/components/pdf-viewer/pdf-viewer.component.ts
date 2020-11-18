import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PdfViewerModule, PDFViewerParams } from 'ng2-pdf-viewer';
import { ApiService } from 'src/app/API/api.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, AfterViewInit {

  @Input() public src: string;
  @Input() public page: number;
  @Input() public frame: number[];
  @ViewChild('pdfViewer') pdf;
  public tokenFrame: string[];
  constructor() { }

  ngOnInit(): void {
    this.getTokenFrame();
  }

  ngAfterViewInit(): void {
     console.log(this.pdf);
  }

  private getTokenFrame() {
    let tokenFrame;
    const zoomLevel = "auto";
    const xOffset = this.frame[0];
    const yOffset = this.frame[1];
    
    tokenFrame = [zoomLevel, xOffset.toString(), yOffset.toString()];
    this.tokenFrame = tokenFrame;
  }

}
