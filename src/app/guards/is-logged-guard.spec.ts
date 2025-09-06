import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { IsLoggedGuard } from './is.logged-guard';

describe('IsLoggedGuard', () => {
  let guard: IsLoggedGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });

    guard = TestBed.inject(IsLoggedGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should block access if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{"email":"test@test.com"}');
    const navigateSpy = spyOn(router, 'navigate');

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should allow access if no user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = guard.canActivate();

    expect(result).toBeTrue();
  });
});
