import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocOverviewComponent } from './doc-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/API/api.service';
import { HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AsyncTimestampPipe } from '../../custom-pipes/async-timestamp.pipe'

describe('DocOverviewComponent', () => {

  let apiService: ApiService;
  let client: HttpClient;
  let pipe: AsyncTimestampPipe;

  let component: DocOverviewComponent;
  let fixture: ComponentFixture<DocOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocOverviewComponent, AsyncTimestampPipe ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ ApiService ],
    }).compileComponents();
  }));

  beforeEach(() => {
    client = TestBed.inject(HttpClient);
    apiService = TestBed.inject(ApiService);

    fixture = TestBed.createComponent(DocOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
  });

  it('should create a table with the expected number of rows', () => {
    const testData = of([
      {"corrected": 2973, "count": 3328, "docid": "6148", "url": "/6148/tokens.json"},
      {"corrected": 1, "count": 9999, "docid": "9999", "url": "/9999/tokens.json"},
    ]);
    const debug: DebugElement = fixture.debugElement;

    spyOn(apiService, 'getOverview').and.returnValue(testData);
    fixture.detectChanges();

    //inspect TableBody
    const tableBody: HTMLElement = debug.query(By.css('tbody')).nativeElement; 
    expect(tableBody).toBeDefined(); 
    expect(tableBody.children.length).toEqual(2);

  });

  it('should create a table containing rows with expected data', () => {
    const testData = of([
      {"corrected": 2973, "count": 3328, "docid": "6148", "url": "/6148/tokens.json"},
      {"corrected": 1, "count": 9999, "docid": "9999", "url": "/9999/tokens.json"},
    ]);
    const debug: DebugElement = fixture.debugElement;

    spyOn(apiService, 'getOverview').and.returnValue(testData);
    // spyOn(apiService, 'getDocumentDate').and.returnValue()
    fixture.detectChanges();

    //Inspect table rows
    const tableRow1: HTMLTableRowElement = debug.query(By.css('#tr-6148')).nativeElement;
    const tableRow2: HTMLTableRowElement = debug.query(By.css('#tr-9999')).nativeElement;

    expect(tableRow1.cells.length).toEqual(4);
    expect(tableRow2.cells.length).toEqual(4);

    expect(tableRow1.cells[0].textContent).toMatch('6148');
    expect(tableRow1.cells[1].textContent).toMatch('2973 rettet ud af 3328');

    expect(tableRow2.cells[0].textContent).toContain('9999');
    expect(tableRow2.cells[1].textContent).toContain('1 rettet ud af 9999');
    
  });

  it('should raise a click event when clicked (triggerEventhandler)', () => {
    const testData = of([
      {"corrected": 2973, "count": 3328, "docid": "6148", "url": "/6148/tokens.json"},
      {"corrected": 1, "count": 9999, "docid": "9999", "url": "/9999/tokens.json"},
    ]);
    const debug: DebugElement = fixture.debugElement;

    spyOn(apiService, 'getOverview').and.returnValue(testData);
    fixture.detectChanges();
    
    const tableRow1: HTMLTableRowElement = debug.query(By.css('#tr-6148')).nativeElement;
    const tableRow2: HTMLTableRowElement = debug.query(By.css('#tr-9999')).nativeElement; 
    expect(tableRow1.attributes.getNamedItem("ng-reflect-router-link").value).toMatch('/tokens/6148');
    expect(tableRow2.attributes.getNamedItem("ng-reflect-router-link").value).toMatch('/tokens/9999');
    
  })

});
