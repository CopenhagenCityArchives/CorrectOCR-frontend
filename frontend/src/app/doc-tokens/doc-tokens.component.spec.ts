import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTokensComponent } from './doc-tokens.component';

describe('DocTokensComponent', () => {
  let component: DocTokensComponent;
  let fixture: ComponentFixture<DocTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTokensComponent ]
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
