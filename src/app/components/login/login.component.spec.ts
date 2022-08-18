import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { IUser } from 'src/app/shared/interface/user/user';

import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let inputEmail: HTMLInputElement;
  let inputPassword: HTMLInputElement;
  let mockLogin: any;
  let router: Router;
  let mockUser: IUser[];
  let spyAllUsers: jasmine.Spy;
  let spyLogin: jasmine.Spy;
  let spySaveUser: jasmine.Spy;
  let authService: AuthService;
  let usersService: UsersService;
  let storageService: StorageService;

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
      create_at: '2022-09-08T12:49:00.000Z'
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlBhdmxvIiwidXNlcnN1cm5hbWUiOiJQYXZsaXYiLCJlbWFpbCI6InBhdmxpdkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY1NDMyMSIsImJhbGFuY2UiOjEwMDAwMCwiZXhwZW5zZXMiOjUwMDAwLCJpbmNvbWUiOjIwMDAsImltYWdlUGF0aCI6Imh0dHBzOi8vd3d3LnRoZXJjb25saW5lLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyMi8wNS9Eb2VzLUZhY2Vib29rLWhhdmUtdGhlLSVFMiU4MCU5OE5ldy1Qcm9maWxlLVBpYy1mZWF0dXJlLWFzLWFwcC1nb2VzLXZpcmFsLTEucG5nIiwiY3JlYXRlX2F0IjoiMjAyMi0wNy0yN1QwNzoyODowNy4wMDBaIn0sImlhdCI6MTY1OTE4NTc1NiwiZXhwIjoxNjU5NzkwNTU2fQ.XFKOELSvP93DruLjXT9tO4u7SIV3xitGk_sz3iVCo94"
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [AuthService],
    })
      .compileComponents();
    router = TestBed.get(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockLogin = {
      email: '', password: ''
    };
    mockUser = [{ id: 1, username: 'Ira', usersurname: 'Pankiv', email: 'pankiv@gmail.com', password: '123456', balance: 10000, expenses: 8000, income: 500, imagePath: 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png', create_at: new Date('09.08.2022, 15:49') }];
    component.users = mockUser;

    usersService = TestBed.get(UsersService);
    authService = TestBed.get(AuthService);
    storageService = TestBed.get(StorageService);

    spyLogin = spyOn(authService, 'login').and.callThrough();
    spyAllUsers = spyOn(usersService, 'getAll').and.callThrough();
    spySaveUser = spyOn(storageService, 'saveUser').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a GetUsers method for get all Users", () => {
    component.GetUsers();
    fixture.detectChanges();
    expect(component.users).toEqual(mockUser);
    expect(spyAllUsers.calls.any()).toBe(true, 'getAll should be called');
  })

  it("should call GetUsers and return list of users", () => {
    const response: IUser[] = [];
    spyAllUsers.and.returnValue(of(response))
    component.GetUsers();
    fixture.detectChanges();
    expect(component.users).toEqual(response);
  });

  it('should call auth login method for don`t equal passwords', () => {
    // to set values
    component.form.email = 'ivanov@gmail.com';
    component.form.password = '123456';
    component.onLogin();
    fixture.detectChanges();
    expect(component.isSignInFailed).toBeTruthy();
  });

  it('should call auth login method for equal passwords', () => {
    // to set values
    component.form.email = 'pankiv@gmail.com';
    component.form.password = '123456';
    component.onLogin();
    fixture.detectChanges();
    expect(component.isSignInFailed).toBeFalsy();
    expect(spyLogin.calls.any()).toBe(true, 'login should be called');
  });

  it("should call onLogin and return login user", () => {
    const response: IUser[] = [];
    component.form.email = 'pankiv@gmail.com';
    component.form.password = '123456';
    component.data = { id: 1, username: 'Ira', usersurname: 'Pankiv', email: 'pankiv@gmail.com', password: '123456', balance: 10000, expenses: 8000, income: 500, imagePath: 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png', create_at: new Date('09.08.2022, 15:49') };
    spyLogin.and.returnValue(of(response))

    component.onLogin();
    fixture.detectChanges();

    expect(component.data).toEqual(response);
    expect(spySaveUser.calls.any()).toBe(true, 'saveUser should be called');
  });

  it('created a form with email and password input and login button', () => {
    const emailContainer = fixture.debugElement.nativeElement.querySelector('#email-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(emailContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('should display the `Login` button', () => {
    //There should a create button in the template
    const loginButton = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(loginButton.innerText).toContain("Login");
  });
  it('Display Email Error Msg when Email is blank', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('#email-error-msg');
    expect(emailErrorMsg).toBeDefined();
  });

  it('Display Password Error Msg when Username is blank', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
  });

  it('Display Both Email & Password Error Msg when both field is blank', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('#email-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');

    expect(emailErrorMsg).toBeDefined();

    expect(passwordErrorMsg).toBeDefined();
  });

  it('When email is blank, email field should display red outline ', () => {

    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const emailInput = inputs[0];

    expect(emailInput.classList).toContain('ng-untouched');
  });

  it('When password is blank, password field should display red outline ', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain('ng-untouched');
  });

  it("should accept input values", () => {
    //Query the input selectors
    inputEmail = fixture.debugElement.nativeElement.querySelector(".email");
    inputPassword = fixture.debugElement.nativeElement.querySelector(".password");

    //Set their value
    inputEmail.value = mockLogin.email;
    inputPassword.value = mockLogin.password;

    //Dispatch an event
    inputEmail.dispatchEvent(new Event("input"));
    inputPassword.dispatchEvent(new Event("input"));

    expect(mockLogin.email).toEqual(component.form.email);
    expect(mockLogin.password).toEqual(component.form.password);
  });

});
