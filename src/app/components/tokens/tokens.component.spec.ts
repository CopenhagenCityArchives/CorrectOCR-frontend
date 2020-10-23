import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement, SimpleChange } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/API/api.service';
import { environment } from 'src/environments/environment';
import { Token } from './token';
import { TokensComponent } from './tokens.component';
import { TokensPipePipe } from '../../custom-pipes/tokens-pipe.pipe';

describe('TokensComponent', () => {
  let component: TokensComponent;
  let fixture: ComponentFixture<TokensComponent>;
  let apiService: ApiService;
  let controller: HttpTestingController;
  let pipe: TokensPipePipe;

  const url: string = environment.apiUrl;
  const testMainToken = require('../../../test-helpers/testMainToken.json');
  const testMainToken$: Observable<Token> = of(testMainToken);
  const testLeftToken = require('../../../test-helpers/testLeftToken.json');
  const testRightToken = require('../../../test-helpers/testRightToken.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokensComponent, TokensPipePipe ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [ ApiService, TokensPipePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    pipe = TestBed.inject(TokensPipePipe);
    controller = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TokensComponent);
    component = fixture.componentInstance;

    component.mainToken$ = testMainToken$;
    component.ngOnChanges({
      mainToken$: new SimpleChange(null, testMainToken$, true)
    });
  });

  afterEach(() => {
    controller.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mainToken in DOM when ngOnChanges() is triggered with a mainToken$', () => {
    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));
    const debug: DebugElement = fixture.debugElement;
    fixture.detectChanges();
    const mainTokenCard: HTMLElement = debug.query(By.css('#main_token_card')).nativeElement;
    expect(mainTokenCard).toBeDefined();
    expect(component.mainToken$).toEqual(testMainToken$);
  })

  it('should create the 3 expected tokens when getTokens() is triggered', async() => {
    const testData = new Token(testMainToken);
    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));
    
    fixture.detectChanges();

    const debug: DebugElement = fixture.debugElement;
    const mainTokenImg: HTMLImageElement = debug.query(By.css('#main_token_img')).nativeElement;
    const leftTokenImg: HTMLImageElement = debug.query(By.css('#left_token_img')).nativeElement;
    const rightTokenImg: HTMLImageElement = debug.query(By.css('#right_token_img')).nativeElement;
    const mainTokenBtns: HTMLElement = debug.query(By.css('#main_btn_group')).nativeElement;

    //assert tokens has correct image values (see test helpers for token values)
    expect(mainTokenImg.src).toEqual(url + '/6148/token-331.png');
    expect(leftTokenImg.src).toEqual(url + '/6148/token-330.png');
    expect(rightTokenImg.src).toEqual(url + '/6148/token-332.png');

    expect(mainTokenImg.title).toEqual('Token id: 6148/331');
    expect(leftTokenImg.title).toEqual('Token id: 6148/330');
    expect(rightTokenImg.title).toEqual('Token id: 6148/332');

    // assert main_token buttons has correct values
    expect(mainTokenBtns.children[0].innerHTML).toEqual(testData.firstBest);
    expect(mainTokenBtns.children[1].innerHTML).toEqual(testData.secondBest)
    expect(mainTokenBtns.children[2].innerHTML).toEqual(testData.thirdBest);
  });
  
  it('should call the correct function when triggered through nextToken()', () => {
    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));
    spyOn(component.getNextMainToken, 'emit');
    fixture.detectChanges();
    component.nextToken();
    expect(component.getNextMainToken.emit).toHaveBeenCalledTimes(1);
  })

  it('should clear trigger correct() function upon clicking btn', () => {
    const testData = new Token(testMainToken);

    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));

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
    expect(component.correct).toHaveBeenCalledWith(testData.firstBest);
    btnSecondBest.click();
    expect(component.correct).toHaveBeenCalledTimes(2);
    expect(component.correct).toHaveBeenCalledWith(testData.secondBest);
    btnThirdBest.click();
    expect(component.correct).toHaveBeenCalledTimes(3);
    expect(component.correct).toHaveBeenCalledWith(testData.thirdBest);
  })

  it('should trigger hypLeft() or hypRight() upon clicking the correct btns', () => {
    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));

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
    apiService.getLeftToken = jasmine.createSpy("leftToken spy").and.returnValue(of(testLeftToken));
    apiService.getRightToken = jasmine.createSpy("rightToken spy").and.returnValue(of(testRightToken));

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

  it('should call API.postGold & NextToken() when correct() is called', fakeAsync(() => {
    apiService.postGold = jasmine.createSpy('postGold Spy').and.returnValue(of(testLeftToken));
    component.nextToken = jasmine.createSpy('nextToken Spy').and.returnValue(of(testRightToken));
    component.correct('test');
    tick();

    expect(apiService.postGold).toHaveBeenCalledTimes(1);
    expect(component.nextToken).toHaveBeenCalledTimes(1);
  }));

  it('should call API.postHypernate when hypLeft() is called', fakeAsync(() => {
    apiService.postHypernate = jasmine.createSpy('postHypernate Spy').and.returnValue(of(testLeftToken));
    component.nextToken = jasmine.createSpy('nextToken Spy').and.returnValue(of(testRightToken));
    component.hypLeft();
    tick();

    expect(apiService.postHypernate).toHaveBeenCalledTimes(1);
    expect(component.nextToken).toHaveBeenCalledTimes(1);
  }));

  it('should call API.postHypernate when hypRight() is called', fakeAsync(() => {
    apiService.postHypernate = jasmine.createSpy('postHypernate Spy').and.returnValue(of(testLeftToken));
    component.nextToken = jasmine.createSpy('nextToken Spy').and.returnValue(of(testRightToken));
    component.hypRight();
    tick();

    expect(apiService.postHypernate).toHaveBeenCalledTimes(1);
    expect(component.nextToken).toHaveBeenCalledTimes(1);
  }));

});