import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/API/api.service';
import { ActivatedRouteStub } from 'src/test-helpers/activated-route-stub';
import { DocTokensComponent } from '../doc-tokens/doc-tokens.component';

import { DocTokensPipeComponent } from './doc-tokens-pipe.component';

describe('DocTokensPipeComponent', () => {
  let apiService: ApiService;
  let component: DocTokensPipeComponent;
  let fixture: ComponentFixture<DocTokensPipeComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  const testDocs:Array<JSON> = require('../../../test-helpers/testGet_All_Tokens_From_Doc_Id.json');
  const testDoc6000:JSON = testDocs[0];

  let getTokenFromInfoUrlSpy: jasmine.Spy;
  let getNextTokenFromListSpy: jasmine.Spy;
  let getAllTokensFromDocIdSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTokensPipeComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ ApiService, {provide: ActivatedRoute, useValue: activatedRoute} ]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(DocTokensPipeComponent);
    component = fixture.componentInstance;
    getTokenFromInfoUrlSpy = spyOn(apiService, 'getTokenFromInfoUrl').and.returnValue(of(testDoc6000));
    getAllTokensFromDocIdSpy = spyOn(apiService, 'getAllTokensFromDocId').and.returnValue(of(testDoc6000));
    getNextTokenFromListSpy = spyOn(component, 'getNextTokenFromList').and.callThrough();
  });

  afterEach(() => {
    getNextTokenFromListSpy.calls.reset();
    getAllTokensFromDocIdSpy.calls.reset();
    getTokenFromInfoUrlSpy.calls.reset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hold a list of token info after ngInit has run', fakeAsync(() => {
    activatedRoute.setParamMap({docid: "6000"});
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(getAllTokensFromDocIdSpy).toHaveBeenCalled();
    expect(component.tokenList.length).toBeGreaterThan(0);
  }));

  it('should get correct value from paramMap after ngOnInit() is called', () => {
    activatedRoute.setParamMap({docid: "6000"});
    fixture.detectChanges();
    expect(apiService.getAllTokensFromDocId).toHaveBeenCalledWith("6000");
  });

  it('should hold a TokenList, Uncorrected & Corrected list of tokens with an expected length after ngOnInit() is called ', fakeAsync(() => {
    activatedRoute.setParamMap({docid: "6000"});
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.tokenList.length).toBe(10);
    expect(component.uncorrectedList.length).toBe(6);
    expect(component.correctedList.length).toBe(4);
  }));

});

describe('DocTokensComponent calls', () => {
  let apiService: ApiService;
  let component: DocTokensComponent;
  let fixture: ComponentFixture<DocTokensComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  const testDocs:Array<JSON> = require('../../../test-helpers/testGet_All_Tokens_From_Doc_Id.json');
  const testDoc6000:JSON = testDocs[0];

  let getTokenFromInfoUrlSpy: jasmine.Spy;
  let getNextTokenFromListSpy: jasmine.Spy;
  let getAllTokensFromDocIdSpy: jasmine.Spy;

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
    getTokenFromInfoUrlSpy = spyOn(apiService, 'getTokenFromInfoUrl').and.returnValue(of(testDoc6000));
    getAllTokensFromDocIdSpy = spyOn(apiService, 'getAllTokensFromDocId').and.returnValue(of(testDoc6000));
    getNextTokenFromListSpy = spyOn(component, 'getNextTokenFromList').and.callThrough();
  });

  afterEach(() => {
    getNextTokenFromListSpy.calls.reset();
    getAllTokensFromDocIdSpy.calls.reset();
    getTokenFromInfoUrlSpy.calls.reset();
  })

  it('should call getNextTokenFromList with expected params from component.uncorrectedList when called multiple times', () => {
    activatedRoute.setParamMap({docid: "6000"});

    expect(getNextTokenFromListSpy).toHaveBeenCalledTimes(0);
    expect(component.index).toBe(0)
    fixture.detectChanges();
    const testData:Array<Object> = component.uncorrectedList;

    expect(getNextTokenFromListSpy).toHaveBeenCalledTimes(1);
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[0]['info_url']);
    expect(component.index).toBe(1)

    component.getNextTokenFromList();
    expect(getNextTokenFromListSpy).toHaveBeenCalledTimes(2);
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[1]['info_url']);
    expect(component.index).toBe(2)

    component.getNextTokenFromList();
    expect(getNextTokenFromListSpy).toHaveBeenCalledTimes(3);
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[2]['info_url']);
    expect(component.index).toBe(3)

  });
});
