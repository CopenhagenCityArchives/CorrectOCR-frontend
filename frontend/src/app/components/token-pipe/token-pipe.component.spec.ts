import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokensPipePipe } from 'src/app/custom-pipes/tokens-pipe.pipe';
import { Token } from '../tokens/token';
import { TokenPipeComponent } from './token-pipe.component';

describe('TokenPipeComponent', () => {
  let component: TokenPipeComponent;
  let fixture: ComponentFixture<TokenPipeComponent>;
  let pipe: TokensPipePipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenPipeComponent, TokensPipePipe ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenPipeComponent);
    component = fixture.componentInstance;
    pipe = new TokensPipePipe();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return null if provided with no value', () => {
    let testData:JSON;

    expect(pipe.transform(testData)).toBe(null);
  });

  it('should return a valid token when given valid JSON data', () => {
    const testJSON = require('../../../test-helpers/testMainToken.json');
    expect(pipe.transform(testJSON)).toEqual(new Token(testJSON))
  });
  

});
