import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogPasswordDialog } from './dialog-password-dialog'
import { IUser } from 'src/app/shared/interface/user/user';

import { StorageService } from 'src/app/shared/service/storage/storage.service';

describe('DialogPasswordDialog', () => {
  let component: DialogPasswordDialog;
  let fixture: ComponentFixture<DialogPasswordDialog>;
  let password: string;
  let inputOldPassword: HTMLInputElement;
  let mockUser: IUser;
  let storageService: StorageService;
  let spyLogUser: jasmine.Spy;
  const dialogMock = {
    close: () => { }
  };

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
      create_at: '2022-09-08T12:49:00.000Z'
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlBhdmxvIiwidXNlcnN1cm5hbWUiOiJQYXZsaXYiLCJlbWFpbCI6InBhdmxpdkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY1NDMyMSIsImJhbGFuY2UiOjEwMDAwMCwiZXhwZW5zZXMiOjUwMDAwLCJpbmNvbWUiOjIwMDAsImltYWdlUGF0aCI6Imh0dHBzOi8vd3d3LnRoZXJjb25saW5lLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyMi8wNS9Eb2VzLUZhY2Vib29rLWhhdmUtdGhlLSVFMiU4MCU5OE5ldy1Qcm9maWxlLVBpYy1mZWF0dXJlLWFzLWFwcC1nb2VzLXZpcmFsLTEucG5nIiwiY3JlYXRlX2F0IjoiMjAyMi0wNy0yN1QwNzoyODowNy4wMDBaIn0sImlhdCI6MTY1OTE4NTc1NiwiZXhwIjoxNjU5NzkwNTU2fQ.XFKOELSvP93DruLjXT9tO4u7SIV3xitGk_sz3iVCo94"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogPasswordDialog],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
    password = '';
    mockUser = { id: 1, username: 'Ira', usersurname: 'Pankiv', email: 'pankiv@gmail.com', password: '123456', balance: 10000, expenses: 8000, income: 500, imagePath: 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png', create_at: new Date('09.08.2022, 15:49') };
    component.LogUser = mockUser;
    component.data.password = 'Ivanka1#';
    component.log = log;
    component.strongRegex.test(component.data.password);
    storageService = TestBed.get(StorageService);
    spyLogUser = spyOn(storageService, 'getUser').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a GetLoginUser method for get User from sessionStorage", () => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    component.GetLoginUser();
    fixture.detectChanges();
    expect(component.log).toEqual(log);
    expect(component.LogUser).toEqual(log.user);
    expect(spyLogUser.calls.any()).toBe(true, 'getUser should be called');
  })

  it('Display Password Error Msg when Passwort is not correct', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.next');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('.passwordError');
    expect(passwordErrorMsg).toBeDefined();
  });


  it("should accept input values", () => {
    //Query the input selectors
    inputOldPassword = fixture.debugElement.nativeElement.querySelector(".oldPassword");

    //Set their value
    inputOldPassword.value = password;

    //Dispatch an event
    inputOldPassword.dispatchEvent(new Event("input"));

    expect(password).toEqual(component.password);
  });

  it('dialog should be closed after onNoClick()', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it("should have a CheckPassword method for change password if old password is true", () => {
    component.password = '123456';
    component.CheckPassword();
    fixture.detectChanges();
    expect(component.passwordWrong).toBeFalsy();
    expect(component.isPasswordOk).toBeTruthy();
  })

  it("should have a CheckPassword method for change password if old password is false", () => {
    component.CheckPassword();
    fixture.detectChanges();
    expect(component.passwordWrong).toBeTruthy();
  })

  it("should have a CheckNewPassword method for change password if confirm password is true", () => {
    component.password1 = 'Ivanka1#';
    component.CheckNewPassword();
    fixture.detectChanges();
    expect(component.confirmPassword).toBeFalsy();
  })

  it("should have a CheckNewPassword method for change password if confirm password is correct", () => {
    component.password1 = 'Ivanka1#';
    component.data.password = 'Ivanka1#';
    component.strongRegex.test(component.data.password);
    component.CheckNewPassword();
    fixture.detectChanges();
    expect(component.passwordInvalid).toBeFalsy();
    expect(component.newPasswordValid).toBeTruthy();
  })

  it("should have a CheckNewPassword method for change password if confirm password is incorrect", () => {
    component.password1 = 'ivanka1';
    component.CheckNewPassword();
    fixture.detectChanges();
    expect(component.passwordInvalid).toBeFalsy();
    expect(component.newPasswordValid).toBeFalsy();
  })

  it("should have a CheckNewPassword method for change password if confirm password is false", () => {
    component.password1 = 'Ivanka';
    component.CheckNewPassword();
    fixture.detectChanges();
    expect(component.confirmPassword).toBeTruthy();
  })

});
