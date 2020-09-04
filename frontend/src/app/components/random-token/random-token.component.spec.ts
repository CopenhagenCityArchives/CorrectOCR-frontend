import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomTokenComponent } from './random-token.component';
import { ApiService } from 'src/app/API/api.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { Token } from '../tokens/token';
import { By } from '@angular/platform-browser';

describe('RandomTokenComponent', () => {
  let component: RandomTokenComponent;
  let fixture: ComponentFixture<RandomTokenComponent>;
  let apiService: ApiService;
  let controller: HttpTestingController;

  const testMainToken = require('../../../test-helpers/testMainToken.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomTokenComponent, MockTokensComponet ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ ApiService ]
    })
    .compileComponents();
  }));

  @Component({
    selector: 'app-tokens',
    template: ''
  })
  class MockTokensComponet{
    @Input() public mainToken: Token;
  }

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(RandomTokenComponent);
    
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the correct api enpoint when getRandomToken() is called', () => {
    apiService.getRandomToken = jasmine.createSpy('getRandomToken spy').and.returnValue(of(testMainToken));
    fixture.detectChanges();
    expect(apiService.getRandomToken).toHaveBeenCalledTimes(1); 
  });

  it('should save token in component.randomToken when getRandomToken() is called', () => {
    let testData: Token = new Token(testMainToken);
    apiService.getRandomToken = jasmine.createSpy('getRandomToken spy').and.returnValue(of(testMainToken));
    fixture.detectChanges();
    expect(apiService.getRandomToken).toHaveBeenCalled();
    expect(component.randomToken).toEqual(testData);
  })

  it('should parse component.randomToken to app-TokensComponent.mainToken', () => {
    apiService.getRandomToken = jasmine.createSpy('getRandomToken spy').and.returnValue(of(testMainToken));
    const mockTokensComponent = fixture.debugElement.query(By.directive(MockTokensComponet)).componentInstance;
    fixture.detectChanges();
    expect(component.randomToken).toEqual(mockTokensComponent.mainToken);
  })
 

});
