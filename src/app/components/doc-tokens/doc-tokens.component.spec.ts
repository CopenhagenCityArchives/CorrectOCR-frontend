import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DocTokensComponent } from './doc-tokens.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/API/api.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/test-helpers/activated-route-stub';
import { of } from 'rxjs';

describe('DocTokensComponent', () => {
  let apiService: ApiService;
  let component: DocTokensComponent;
  let fixture: ComponentFixture<DocTokensComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  const testDocs:Array<JSON> = require('../../../test-helpers/testGet_All_Tokens_From_Doc_Id.json');
  const testDoc6000:JSON = testDocs[0];

  //beforeEach(() => activatedRoute.setParamMap({docid: "6000"}) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTokensComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ ApiService, {provide: ActivatedRoute, useValue: activatedRoute} ]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(DocTokensComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hold a list of token info after ngInit has run', () => {
    spyOn(apiService, 'getAllTokensFromDocId').and.returnValue(of(testDoc6000));
    fixture.detectChanges();
    expect(component.tokenList.length).toBeGreaterThan(0);
  });

  it('should get correct value from paramMap after ngOnInit() is called', () => {
    activatedRoute.setParamMap({docid: "6000"});
    spyOn(apiService, 'getAllTokensFromDocId').and.returnValue(of(testDoc6000));
    fixture.detectChanges();
    expect(apiService.getAllTokensFromDocId).toHaveBeenCalledWith("6000");
  });

  it('should hold a TokenList, Uncorrected & Corrected list of tokens with an expected length after ngOnInit() is called ', () => {
    spyOn(apiService, 'getAllTokensFromDocId').and.returnValue(of(testDoc6000));
    fixture.detectChanges();
    expect(component.tokenList.length).toBe(10);
    expect(component.uncorrectedList.length).toBe(6);
    expect(component.correctedList.length).toBe(4);
  });

  it('should call getNextTokenFromList with expected params from component.uncorrectedList when called multiple times', () => {
    activatedRoute.setParamMap({docid: "6000"});
    spyOn(apiService, 'getAllTokensFromDocId').and.returnValue(of(testDoc6000));
    spyOn(apiService, 'getTokenFromInfoUrl').and.returnValue(of(testDoc6000));
    spyOn(component, 'getNextTokenFromList').and.callThrough();

    // expect(component.getNextTokenFromList).toHaveBeenCalledTimes(0);
    fixture.detectChanges();

    component.getNextTokenFromList();
    const testData:Array<Object> = component.uncorrectedList;
    // expect(component.getNextTokenFromList).toHaveBeenCalledTimes(1);
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[0]['info_url']);
    component.getNextTokenFromList();
    // expect(component.getNextTokenFromList).toHaveBeenCalledTimes(2);
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[1]['info_url']);
    component.getNextTokenFromList();
    // expect(component.getNextTokenFromList).toHaveBeenCalledTimes(3);
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[2]['info_url']);

  });

});
