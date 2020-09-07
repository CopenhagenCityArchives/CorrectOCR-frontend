import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTokensComponent } from './doc-tokens.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/API/api.service';

describe('DocTokensComponent', () => {
  let component: DocTokensComponent;
  let fixture: ComponentFixture<DocTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTokensComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ ApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
