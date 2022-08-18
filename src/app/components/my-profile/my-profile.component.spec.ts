import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DialogPasswordDialog } from './dialog-password-dialog/dialog-password-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyProfileComponent } from './my-profile.component';
import { DialogEditUserDialogComponent } from './dialog-edit-user-dialog/dialog-edit-user-dialog.component';

import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UsersService } from 'src/app/shared/service/users/users.service';

describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;
  let router: Router

  let matcard: HTMLElement;
  let storageService: StorageService;
  let usersService: UsersService;
  let spyLogUser: jasmine.Spy;
  let spyUpdateUser: jasmine.Spy;
  let spyupdateUser: jasmine.Spy;

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
      declarations: [MyProfileComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule,
        BrowserAnimationsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    storageService = TestBed.get(StorageService);
    usersService = TestBed.get(UsersService);
    spyLogUser = spyOn(storageService, 'getUser').and.callThrough();
    spyUpdateUser = spyOn(usersService, 'updateUser').and.callThrough();
    spyupdateUser = spyOn(storageService, 'UpdateUser').and.callThrough();

    matcard = fixture.debugElement.nativeElement.querySelector("mat-card-title");
    component.LogUser = log.user;
    component.log = log;
    component.name = log.user.username;
    component.surname = log.user.usersurname;
    component.email = log.user.email;
    component.balance = log.user.balance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("should have a GetLoginUser method for get User from sessionStorage", () => {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    component.GetLoginUser();
    fixture.detectChanges();
    expect(component.log).toEqual(log);
    expect(spyLogUser.calls.any()).toBe(true, 'getUser should be called');
  })

  it("should have a ChooseAvatar method for change profile photo", () => {
    component.ChooseAvatar();
    fixture.detectChanges();
    expect(component.isAvatar).toBeTruthy();
    expect(component.isChoose).toBeTruthy();
  })
  it("should have a close method for change profile photo", () => {
    component.close();
    fixture.detectChanges();
    expect(component.isAvatar).toBeFalsy();
    expect(component.isChoose).toBeFalsy();
  })

  it('should navigate to "home"', () => {
    component.Back();
    expect(router.navigate(['home'])).toBeTruthy();
  });

  it("should have a ChoosePhoto method for change profile photo", () => {
    component.ChoosePhoto(1);
    fixture.detectChanges();
    expect(component.isAvatar).toBeFalsy();
    expect(component.isChoose).toBeFalsy();
  })


  it('Should open the PasswordDialog in a MatDialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDialog();
    expect(component.dialog.open).toHaveBeenCalledWith(DialogPasswordDialog, {
      width: '250px',
      data: Object({ password: component.password })
    })
  });

  it('Return from DialogPasswordDialog result', () => {
    const response: string = '654321';
    let dialogRef = component.dialog.open(DialogPasswordDialog, {
      width: '250px',
      data: { password: '' }
    });
    spyOn(dialogRef, 'afterClosed').and.callThrough().and.returnValue(of(response));
    component.openDialog();
    fixture.detectChanges();
    dialogRef.close();
    fixture.detectChanges();
    expect(component.LogUser.password).toEqual(response);
  });

  it('Should open the EditUserDialog in a MatDialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.Update('name');
    expect(component.dialog.open).toHaveBeenCalledWith(DialogEditUserDialogComponent, {
      width: '250px',
      data: Object({ userDetail: component.userDetail, updateItem: component.updateItem })
    });
  });

  it('Return from DialogEditUserDialogComponent result equal name', () => {
    const response: string = 'Pavlo';
    component.updateItem = 'name';
    let dialogRef = component.dialog.open(DialogEditUserDialogComponent, {
      width: '250px',
      data: {
        userDetail: component.userDetail,
        updateItem: 'name'
      }
    });
    spyOn(dialogRef, 'afterClosed').and.callThrough().and.returnValue(of(response));
    component.Update('name');
    fixture.detectChanges();
    dialogRef.close();
    fixture.detectChanges();
    expect(component.LogUser.username).toEqual(response);
    expect(component.name).toEqual(response);
  });

  it('Return from DialogEditUserDialogComponent result equal surname', () => {
    const response: string = 'Pavliv';
    component.updateItem = 'surname';
    let dialogRef = component.dialog.open(DialogEditUserDialogComponent, {
      width: '250px',
      data: {
        userDetail: component.userDetail,
        updateItem: 'surname'
      }
    });
    spyOn(dialogRef, 'afterClosed').and.callThrough().and.returnValue(of(response));
    component.Update('surname');
    fixture.detectChanges();
    dialogRef.close();
    fixture.detectChanges();
    expect(component.LogUser.usersurname).toEqual(response);
    expect(component.surname).toEqual(response);
  });

  it('Return from DialogEditUserDialogComponent result equal email', () => {
    const response: string = 'pavliv@gmail.com';
    component.updateItem = 'email';
    let dialogRef = component.dialog.open(DialogEditUserDialogComponent, {
      width: '250px',
      data: {
        userDetail: component.userDetail,
        updateItem: 'email'
      }
    });
    spyOn(dialogRef, 'afterClosed').and.callThrough().and.returnValue(of(response));
    component.Update('email');
    fixture.detectChanges();
    dialogRef.close();
    fixture.detectChanges();
    expect(component.LogUser.email).toEqual(response);
    expect(component.email).toEqual(response);
  });

  it('Return from DialogEditUserDialogComponent result equal balance', () => {
    const response: number = 100000;
    component.updateItem = 'balance';
    let dialogRef = component.dialog.open(DialogEditUserDialogComponent, {
      width: '250px',
      data: {
        userDetail: component.userDetail,
        updateItem: 'balance'
      }
    });
    spyOn(dialogRef, 'afterClosed').and.callThrough().and.returnValue(of(response));
    component.Update('balance');
    fixture.detectChanges();
    dialogRef.close();
    fixture.detectChanges();
    expect(component.LogUser.balance).toEqual(response);
    expect(component.balance).toEqual(response);
  });

  it("should have a Save method for update User", () => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    component.Save();
    fixture.detectChanges();
    expect(log).toEqual(component.log);
    storageService.UpdateUser(log);

    expect(spyUpdateUser.calls.any()).toBe(true, 'updateUser should be called');
    expect(spyupdateUser.calls.any()).toBe(true, 'UpdateUser should be called');
  })

  it("should have a Cancel", () => {
    component.Cancel();
    expect(spyLogUser.calls.any()).toBe(true, 'GetLoginUser should be called');
  })

});
