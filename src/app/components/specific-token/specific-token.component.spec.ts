import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/API/api.service';
import { ActivatedRouteStub } from 'src/test-helpers/activated-route-stub';

import { SpecificTokenComponent } from './specific-token.component';

let component: SpecificTokenComponent;
let fixture: ComponentFixture<SpecificTokenComponent>;
let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
let apiService: ApiService;
let router: Router;

const testMainToken = require('../../../test-helpers/testMainToken.json');
let getTokenSpy: jasmine.Spy;


//Run Tests
describe('SpecficTokenComponent', () => {
  beforeEach(()=> {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('with valid paramMap setup', validParamSetup);
  describe('with invalid paramMap setup', invalidParamSetup);
})

// setup first test group
function validParamSetup() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificTokenComponent ],
      imports: [ RouterTestingModule.withRoutes([]), HttpClientTestingModule ],
      providers: [ ApiService, {provide: ActivatedRoute, useValue: activatedRoute} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.setParamMap({docid: 6000, tokenindex: 500});
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    getTokenSpy = spyOn(apiService, 'getToken').and.returnValue(of(testMainToken));

    fixture = TestBed.createComponent(SpecificTokenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('should contain a valid properties when called with a valid ParamMap', () => {
    fixture.detectChanges();
    expect(component.docId).toBe(6000);
    expect(component.tokenIndex).toBe(500);
  })

  it('should call apiService.getSpecficToken correctly when called with a valid ParamMap', () => {
    expect(getTokenSpy).toHaveBeenCalledTimes(0);
    fixture.detectChanges();
    expect(getTokenSpy).toHaveBeenCalledTimes(1);
    expect(getTokenSpy).toHaveBeenCalledWith(6000,500);
  })

}

// setup second group
function invalidParamSetup() {
beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificTokenComponent ],
      imports: [ RouterTestingModule.withRoutes([]), HttpClientTestingModule ],
      providers: [ ApiService, {provide: ActivatedRoute, useValue: activatedRoute} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.setParamMap({docid: "invalid", params: "map"});
    apiService = TestBed.inject(ApiService);
    getTokenSpy = spyOn(apiService, 'getToken').and.returnValue(of(testMainToken));

    fixture = TestBed.createComponent(SpecificTokenComponent);
    component = fixture.componentInstance;
  });

  it('should throw error msg', () => {
    fixture.detectChanges();
    expect(component.ngOnInit).toThrowError()
  })
}
