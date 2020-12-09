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

  const testData = require('../../../test-helpers/testDoc_Overview.json');

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
    const debug: DebugElement = fixture.debugElement;

    spyOn(apiService, 'getOverview').and.returnValue(of(testData));
    fixture.detectChanges();

    //inspect TableBody
    const tableBody: HTMLElement = debug.query(By.css('tbody')).nativeElement; 
    expect(tableBody).toBeDefined(); 
    expect(tableBody.children.length).toEqual(3);

  });

  it('should create a table containing rows with expected data', () => {
    const debug: DebugElement = fixture.debugElement;

    spyOn(apiService, 'getOverview').and.returnValue(of(testData));
    fixture.detectChanges();

    //Inspect table rows
    const tableRow1: HTMLTableRowElement = debug.query(By.css('#tr-6000')).nativeElement;
    const tableRow2: HTMLTableRowElement = debug.query(By.css('#tr-6148')).nativeElement;
    const tableRow3: HTMLTableRowElement = debug.query(By.css('#tr-6158')).nativeElement;

    expect(tableRow1.cells.length).toEqual(4);
    expect(tableRow2.cells.length).toEqual(4);

    expect(tableRow1.cells[0].textContent).toMatch('6000');
    expect(tableRow1.cells[1].textContent).toMatch('16 rettet ud af 256');
    expect(tableRow1.cells[2].textContent).toMatch('27-11-2020 kl. 13.00');

    expect(tableRow2.cells[0].textContent).toContain('6148');
    expect(tableRow2.cells[1].textContent).toContain('220 rettet ud af 285');
    expect(tableRow2.cells[2].textContent).toContain('30-11-2020 kl. 13.05');

    expect(tableRow3.cells[0].textContent).toContain('6158');
    expect(tableRow3.cells[1].textContent).toContain('32 rettet ud af 322');
    expect(tableRow3.cells[2].textContent).toContain('26-11-2020 kl. 11.07');
    
  });

  it('should raise a click event when clicked (triggerEventhandler)', () => {
    const debug: DebugElement = fixture.debugElement;

    spyOn(apiService, 'getOverview').and.returnValue(of(testData));
    fixture.detectChanges();
    
    const tableRow1: HTMLTableRowElement = debug.query(By.css('#tr-6000')).nativeElement;
    const tableRow2: HTMLTableRowElement = debug.query(By.css('#tr-6148')).nativeElement; 
    const tableRow3: HTMLTableRowElement = debug.query(By.css('#tr-6158')).nativeElement; 

    expect(tableRow1.attributes.getNamedItem("ng-reflect-router-link").value).toMatch('/tokens/6000');
    expect(tableRow2.attributes.getNamedItem("ng-reflect-router-link").value).toMatch('/tokens/6148');
    expect(tableRow3.attributes.getNamedItem("ng-reflect-router-link").value).toMatch('/tokens/6158');
    
  })

});
