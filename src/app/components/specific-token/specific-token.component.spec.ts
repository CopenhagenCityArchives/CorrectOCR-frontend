import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificTokenComponent } from './specific-token.component';

describe('SpecificTokenComponent', () => {
  let component: SpecificTokenComponent;
  let fixture: ComponentFixture<SpecificTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
