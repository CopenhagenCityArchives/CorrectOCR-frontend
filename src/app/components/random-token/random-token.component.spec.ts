import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { ApiService } from 'src/app/API/api.service';

import { RandomTokenComponent } from './random-token.component';

describe('RandomPipeComponent', () => {
  let component: RandomTokenComponent;
  let fixture: ComponentFixture<RandomTokenComponent>;
  let apiService: ApiService;
  const testMainToken = require('../../../test-helpers/testMainToken.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomTokenComponent, MockTokensComponet ],
      imports: [ HttpClientTestingModule ],
      providers: [ ApiService ]
    })
    .compileComponents();
  }));

  @Component({
    selector: 'app-tokens',
    template: ''
  })
  class MockTokensComponet{
    @Input() public mainToken$: any;
  }


  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(RandomTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the correct api enpoint when ngOnInit() -> getRandomToken() is called', fakeAsync(() => {
    apiService.getRandomToken = jasmine.createSpy('getRandomToken spy').and.returnValue(of(testMainToken));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(apiService.getRandomToken).toHaveBeenCalledTimes(1); 
  }));

  it('should save observable in component.randomToken$ when getRandomToken() is called', fakeAsync(() => {
    apiService.getRandomToken = jasmine.createSpy('getRandomToken spy').and.returnValue(of(testMainToken));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(apiService.getRandomToken).toHaveBeenCalled();
    expect(component.randomToken$).toBeTruthy();
  }));

  it('should parse component.randomToken to app-TokensComponent.mainToken', fakeAsync(() => {
    apiService.getRandomToken = jasmine.createSpy('getRandomToken spy').and.returnValue(of(testMainToken));
    const mockTokensComponent = fixture.debugElement.query(By.directive(MockTokensComponet)).componentInstance;
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.randomToken$).toEqual(mockTokensComponent.mainToken$);
  }));
});
