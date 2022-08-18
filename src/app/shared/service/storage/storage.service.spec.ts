import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;
  let store: any;
  let router: Router;
  let sessionStorage: any;
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
  }
  // let myData = _myData_;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [StorageService]
    });
    storageService = TestBed.get(StorageService);
    sessionStorage = {};

    spyOn(window.sessionStorage, 'getItem').and.callFake((key) =>
      key in sessionStorage ? sessionStorage[key] : null
    );
    spyOn(window.sessionStorage, 'setItem').and.callFake(
      (key, value) => (sessionStorage[key] = value + '')
    );
    spyOn(window.sessionStorage, 'clear').and.callFake(() => (sessionStorage = {}));
    sessionStorage.user = log;
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });


  it('should clear sessionStorage', () => {
    let result = window.sessionStorage.clear();
    storageService.clean();
    expect(result).toEqual(Object({}));
  });

  it('should saveUser sessionStorage', () => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    storageService.saveUser(log);
    router.navigate(['home']);
    expect(window.sessionStorage.setItem).toHaveBeenCalled();
  });

  it('should updateUser sessionStorage', () => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    storageService.UpdateUser(log);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(USER_KEY, JSON.stringify(log))
  });


  it('should get  value when sessionStorage is not empty', () => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    storageService.getUser();
    let result = window.sessionStorage.getItem(USER_KEY)
    expect(result).toBeTruthy();
  });

  it('should get value when sessionStorage is empty', () => {
    window.sessionStorage.removeItem(USER_KEY);
    storageService.getUser();
    let result = window.sessionStorage.getItem(USER_KEY)
    expect(result).toBeFalsy();
  });

  it('isLoggedIn returns false when the user has not been authenticated', () => {
    window.sessionStorage.removeItem(USER_KEY);
    storageService.getUser();
    let result = window.sessionStorage.getItem(USER_KEY)
    expect(result).toBeFalsy();
    expect(storageService.isLoggedIn()).toBeFalsy();
  });

  it('isLoggedIn returns true when the user has  been authenticated', () => {
    let result = window.sessionStorage.setItem(USER_KEY, JSON.stringify(log.user));
    storageService.isLoggedIn()
    expect(result).toBeTruthy();
    expect(storageService.isLoggedIn()).toBeTruthy();
  });

  it('should call logOut', () => {
    window.sessionStorage.removeItem(USER_KEY);
    router.navigate(['login']);
    storageService.logOut();
    let result = window.sessionStorage.getItem(USER_KEY)
    expect(result).toEqual(null);
  });


})
