import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthGuardService } from './auth.guard.service';

describe('Auth.GuardService', () => {
  let authGuardService: AuthGuardService;
  let router: Router;
  const USER_KEY = 'auth-user';
  let log = {
    user: {
      id: 2,
      username: "Pavlo",
      usersurname: "Pavliv",
      email: "pavliv@gmail.com",
      password: "654321",
      balance: 100000,
      expenses: 50000,
      income: 2000,
      imagePath: "https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png",
      create_at: new Date('09.08.2022, 15:49')
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlBhdmxvIiwidXNlcnN1cm5hbWUiOiJQYXZsaXYiLCJlbWFpbCI6InBhdmxpdkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY1NDMyMSIsImJhbGFuY2UiOjEwMDAwMCwiZXhwZW5zZXMiOjUwMDAwLCJpbmNvbWUiOjIwMDAsImltYWdlUGF0aCI6Imh0dHBzOi8vd3d3LnRoZXJjb25saW5lLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyMi8wNS9Eb2VzLUZhY2Vib29rLWhhdmUtdGhlLSVFMiU4MCU5OE5ldy1Qcm9maWxlLVBpYy1mZWF0dXJlLWFzLWFwcC1nb2VzLXZpcmFsLTEucG5nIiwiY3JlYXRlX2F0IjoiMjAyMi0wNy0yN1QwNzoyODowNy4wMDBaIn0sImlhdCI6MTY1OTE4NTc1NiwiZXhwIjoxNjU5NzkwNTU2fQ.XFKOELSvP93DruLjXT9tO4u7SIV3xitGk_sz3iVCo94"
  };
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{ path: 'login', component: LoginComponent }]
        )
      ]
    })
    authGuardService = TestBed.inject(AuthGuardService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('canActivate returns checkLogin when it false', () => {
    window.sessionStorage.removeItem(USER_KEY);
    authGuardService.canActivate(route, state)
    expect(authGuardService.checkLogin()).toBeFalsy();
  });

  it('canActivate returns checkLogin when it true', () => {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    authGuardService.canActivate(route, state)
    expect(authGuardService.checkLogin()).toBeTruthy();
  });

  it('checkLogin returns true when the user has  been authenticated', () => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    expect(authGuardService.checkLogin()).toBeTruthy();
  });

  it('checkLogin returns false when the user has not been authenticated', () => {
    window.sessionStorage.removeItem(USER_KEY);
    router.navigate(['login']);
    expect(authGuardService.checkLogin()).toBeFalsy();
  });
});
