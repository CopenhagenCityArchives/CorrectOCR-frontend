import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { TokensComponent } from './tokens.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from 'src/app/API/api.service';
import { of } from 'rxjs';
import { Token } from './token';
import { SimpleChange, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('TokensComponent', () => {
  let component: TokensComponent;
  let fixture: ComponentFixture<TokensComponent>;
  let apiService: ApiService;
  let controller: HttpTestingController;

  const testMainToken = require('../../../test-helpers/testMainToken.json');
  const testLeftToken = require('../../../test-helpers/testLeftToken.json');
  const testRightToken = require('../../../test-helpers/testRightToken.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokensComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [ ApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    controller = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TokensComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    controller.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mainToken in DOM when ngOnChanges() is triggered', () => {
    const testData = new Token(testMainToken);  
    const debug: DebugElement = fixture.debugElement;
    component.getTokens = jasmine.createSpy('getTokens Spy').and.returnValue('');
    component.ngOnChanges({
      mainToken: new SimpleChange(null, testData, true)
    });
    fixture.detectChanges();
    const mainTokenCard: HTMLElement = debug.query(By.css('#main_token_card')).nativeElement;
    expect(mainTokenCard).toBeDefined();

  })

it('should create the 3 expected tokens when getTokens() is triggered', async() => {
    const url = 'http://localhost:5000/';
    const testData: Token = new Token(testMainToken);

    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));
    component.ngOnChanges({
      mainToken: new SimpleChange(null, testData, true)
    })

    fixture.detectChanges();
    await fixture.whenStable();

    const debug: DebugElement = fixture.debugElement;
    const mainTokenElm: HTMLElement = debug.query(By.css('#main_token_card')).nativeElement;
    const leftTokenElm: HTMLElement = debug.query(By.css('#left_token_card')).nativeElement;
    const rightTokenelm: HTMLElement = debug.query(By.css('#right_token_card')).nativeElement;
    const mainTokenBtns: HTMLElement = debug.query(By.css('#main_btn_group')).nativeElement;

    //assert tokens has correct image values (see test helpers for token values)
    expect(mainTokenElm.children[0].getAttribute('src')).toEqual(url + '6148/token-331.png');
    expect(leftTokenElm.children[0].getAttribute('src')).toEqual(url + '6148/token-330.png');
    expect(rightTokenelm.children[0].getAttribute('src')).toEqual(url + '6148/token-332.png');

    expect(mainTokenElm.children[0].getAttribute('title')).toEqual('Token id: 6148/331');
    expect(leftTokenElm.children[0].getAttribute('title')).toEqual('Token id: 6148/330');
    expect(rightTokenelm.children[0].getAttribute('title')).toEqual('Token id: 6148/332');

    //assert main_token buttons has correct values
    expect(mainTokenBtns.children[0].innerHTML).toEqual(testData.firstBest);
    expect(mainTokenBtns.children[1].innerHTML).toEqual(testData.secondBest)
    expect(mainTokenBtns.children[2].innerHTML).toEqual(testData.thirdBest);
  });

  it('should call the correct function when triggered through nextToken()', () => {
    spyOn(component.getNextMainToken, 'emit');
    fixture.detectChanges();
    component.nextToken();
    expect(component.getNextMainToken.emit).toHaveBeenCalledTimes(1);
  })

  it('should clear trigger correct() function upon clicking btn', () => {
    //setup tokens
    const mainToken: Token = new Token(testMainToken);
    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));
    component.ngOnChanges({
      mainToken: new SimpleChange(null, mainToken, true)
    })
    fixture.detectChanges();

    const debug: DebugElement = fixture.debugElement;
    const btnGroupDe: DebugElement = debug.query(By.css('#main_btn_group'));
    expect(btnGroupDe.children.length).toEqual(3);

    const btnFirstBest: HTMLButtonElement = btnGroupDe.children[0].nativeElement;
    const btnSecondBest: HTMLButtonElement = btnGroupDe.children[1].nativeElement;
    const btnThirdBest: HTMLButtonElement = btnGroupDe.children[2].nativeElement;

    component.correct = jasmine.createSpy('correct spy');
    btnFirstBest.click();
    expect(component.correct).toHaveBeenCalledTimes(1);
    expect(component.correct).toHaveBeenCalledWith(mainToken.firstBest);
    btnSecondBest.click();
    expect(component.correct).toHaveBeenCalledTimes(2);
    expect(component.correct).toHaveBeenCalledWith(mainToken.secondBest);
    btnThirdBest.click();
    expect(component.correct).toHaveBeenCalledTimes(3);
    expect(component.correct).toHaveBeenCalledWith(mainToken.thirdBest);
  })

  it('should trigger hypLeft() or hypRight() upon clicking the correct btns', () => {
    //setup tokens
    const mainToken: Token = new Token(testMainToken);
    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));
    component.ngOnChanges({
      mainToken: new SimpleChange(null, mainToken, true)
    })
    fixture.detectChanges();

    const debug: DebugElement = fixture.debugElement;
    const hypLeftBtn: HTMLButtonElement = debug.query(By.css('#hyp_left_btn')).nativeElement;
    const hypRightBtn: HTMLButtonElement = debug.query(By.css('#hyp_right_btn')).nativeElement;

    component.hypLeft = jasmine.createSpy('hypLeft spy');
    component.hypRight = jasmine.createSpy('hypRight spy');
    hypLeftBtn.click();
    expect(component.hypLeft).toHaveBeenCalled();
    hypRightBtn.click();
    expect(component.hypRight).toHaveBeenCalled();
  })

  it('should clear dirty inputfield when nextToken() is called', fakeAsync(() => {
    //setup tokens
    const mainToken: Token = new Token(testMainToken);
    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));
    component.ngOnChanges({
      mainToken: new SimpleChange(null, mainToken, true)
    })

    component.andetInputField = 'old value';
    fixture.detectChanges();
    tick();

    const inputField: DebugElement = fixture.debugElement.query(By.css('#andet'));
    const value = "new value";
    const event = new Event('input');    
    expect(component.andetInputField).toEqual('old value');

    inputField.nativeElement.value = value;
    inputField.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    tick();
    
    expect(inputField.nativeElement.value).toEqual(value);
    expect(component.andetInputField).toEqual(value);
    component.nextToken();
    fixture.detectChanges();
    tick();
    expect(inputField.nativeElement.value).toEqual('');
    expect(component.andetInputField).toEqual('');

  }));

  it('should call API.postGold & NextToken() when correct() is called', () => {
    apiService.postGold = jasmine.createSpy('postGold Spy').and.returnValue(of(testLeftToken));
    component.nextToken = jasmine.createSpy('nextToken Spy').and.returnValue(of(testRightToken));
    component.correct('test');

    expect(apiService.postGold).toHaveBeenCalledTimes(1);
    expect(component.nextToken).toHaveBeenCalledTimes(1);
  })

  it('should call API.postHypernate when hypLeft() is called', () => {
    apiService.postHypernate = jasmine.createSpy('postHypernate Spy').and.returnValue(of(testLeftToken));
    component.nextToken = jasmine.createSpy('nextToken Spy').and.returnValue(of(testRightToken));
    component.hypLeft();

    expect(apiService.postHypernate).toHaveBeenCalledTimes(1);
    expect(component.nextToken).toHaveBeenCalledTimes(1);
  })

  it('should call API.postHypernate when hypRight() is called', () => {
    apiService.postHypernate = jasmine.createSpy('postHypernate Spy').and.returnValue(of(testLeftToken));
    component.nextToken = jasmine.createSpy('nextToken Spy').and.returnValue(of(testRightToken));
    component.hypRight();

    expect(apiService.postHypernate).toHaveBeenCalledTimes(1);
    expect(component.nextToken).toHaveBeenCalledTimes(1);
  })


});
