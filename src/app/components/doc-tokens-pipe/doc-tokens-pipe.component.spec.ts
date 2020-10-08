import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from 'src/test-helpers/activated-route-stub';

import { DocTokensPipeComponent } from './doc-tokens-pipe.component';

describe('DocTokensPipeComponent', () => {
  let component: DocTokensPipeComponent;
  let fixture: ComponentFixture<DocTokensPipeComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTokensPipeComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ {provide: ActivatedRoute, useValue: activatedRoute} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTokensPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
