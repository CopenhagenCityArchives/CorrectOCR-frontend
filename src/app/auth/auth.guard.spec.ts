import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}
  
  beforeEach(() => {
  
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock } ],
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
