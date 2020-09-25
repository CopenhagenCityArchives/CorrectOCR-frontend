import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPipeComponent } from './token-pipe.component';

describe('TokenPipeComponent', () => {
  let component: TokenPipeComponent;
  let fixture: ComponentFixture<TokenPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenPipeComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
