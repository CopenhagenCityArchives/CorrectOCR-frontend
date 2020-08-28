import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomTokenComponent } from './random-token.component';

describe('RandomTokenComponent', () => {
  let component: RandomTokenComponent;
  let fixture: ComponentFixture<RandomTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
