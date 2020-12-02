import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/API/api.service';
import { ActivatedRouteStub } from 'src/test-helpers/activated-route-stub';
import { DocTokensComponent } from './doc-tokens.component';

describe('DocTokensComponent', () => {
  let apiService: ApiService;
  let component: DocTokensComponent;
  let fixture: ComponentFixture<DocTokensComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  const testDocsTokenInfo:Array<JSON> = require('../../../test-helpers/testGet_All_Tokens_From_Doc_Id.json');
  const testDocOverview:Array<JSON> = require('../../../test-helpers/testDoc_overview.json');
  const testDoc6000:JSON = testDocsTokenInfo[0];

  let getOverviewSpy: jasmine.Spy;
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
    getOverviewSpy = spyOn(apiService, 'getOverview').and.returnValue(of(testDocOverview));
    getTokenFromInfoUrlSpy = spyOn(apiService, 'getTokenFromInfoUrl').and.returnValue(of(testDoc6000));
    getAllTokensFromDocIdSpy = spyOn(apiService, 'getAllTokensFromDocId').and.returnValue(of(testDoc6000));
    getNextTokenFromListSpy = spyOn(component, 'getNextTokenFromList').and.callThrough();

  });

  afterEach(() => {
    getOverviewSpy.calls.reset();
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

  it('should get correct value from paramMap after ngOnInit() is called', fakeAsync(() => {
    activatedRoute.setParamMap({docid: "6000"});
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(apiService.getAllTokensFromDocId).toHaveBeenCalledWith("6000");
  }));

  it('should hold a TokenList, Uncorrected & Corrected list of tokens with an expected length after ngOnInit() is called ', fakeAsync(() => {
    activatedRoute.setParamMap({docid: "6000"});
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.tokenList.length).toBe(10);
    expect(component.uncorrectedList.length).toBe(6);
    expect(component.correctedList.length).toBe(4);
  }));

  it('should call getNextTokenFromList with expected params from component.uncorrectedList when called multiple times', fakeAsync(() => {
    activatedRoute.setParamMap({docid: "6000"});
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const testData:Array<Object> = component.uncorrectedList;
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[0]['info_url']);
    component.getNextTokenFromList();
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[1]['info_url']);
    component.getNextTokenFromList();
    expect(apiService.getTokenFromInfoUrl).toHaveBeenCalledWith(testData[2]['info_url']);
  }))
});
