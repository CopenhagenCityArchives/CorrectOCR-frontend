import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPipeComponent } from './random-pipe.component';

describe('RandomPipeComponent', () => {
  let component: RandomPipeComponent;
  let fixture: ComponentFixture<RandomPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
