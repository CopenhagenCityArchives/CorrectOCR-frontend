import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokensComponent } from './tokens.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/API/api.service';
import { of } from 'rxjs';
import { Token } from './token';
import { SimpleChange, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('TokensComponent', () => {
  let component: TokensComponent;
  let fixture: ComponentFixture<TokensComponent>;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokensComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ ApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(TokensComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mainToken in DOM when ngOnChanges() is triggered', () => {
    const testData = of(require('../../../test-helpers/testMainToken.json'));    
    const debug: DebugElement = fixture.debugElement;

    testData.subscribe((data:JSON) => {
      let token = new Token(data);
      component.ngOnChanges({
        mainToken: new SimpleChange(null, token, true)
      })
    })
    fixture.detectChanges();

    const mainTokenCard: HTMLElement = debug.query(By.css('#main_token')).nativeElement;
    console.log(mainTokenCard);
    expect(mainTokenCard).toBeDefined();

  })

  
});
