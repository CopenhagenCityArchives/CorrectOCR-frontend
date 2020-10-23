import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/API/api.service';
import { ActivatedRouteStub } from 'src/test-helpers/activated-route-stub';

import { SpecificTokenComponent } from './specific-token.component';

describe('SpecificTokenComponent', () => {
  let component: SpecificTokenComponent;
  let fixture: ComponentFixture<SpecificTokenComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificTokenComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ ApiService, {provide: ActivatedRoute, useValue: activatedRoute} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificTokenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    activatedRoute.setParamMap({docid: "6000", tokenindex: '500'});
    expect(component).toBeTruthy();
  });
});
