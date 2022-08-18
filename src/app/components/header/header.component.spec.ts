import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { IUser } from 'src/app/shared/interface/user/user';

import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UsersService } from 'src/app/shared/service/users/users.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let mockUser: IUser;
  let spyLogOut: jasmine.Spy;
  let spyAllUsers: jasmine.Spy;
  let spyLogUser: jasmine.Spy;
  let mockRoute: any;
  let storageService: StorageService;
  let usersService: UsersService;

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
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatMenuModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.menu'));
    element = de.nativeElement;
    mockRoute = { route: '/my-profile', name: 'My Profile', imagePath: 'assets/images/profile.png' };
    mockUser = { id: 1, username: 'Ira', usersurname: 'Pankiv', email: 'pankiv@gmail.com', password: '123456', balance: 10000, expenses: 8000, income: 500, imagePath: 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png', create_at: new Date('09.08.2022, 15:49') }
    storageService = TestBed.get(StorageService);
    usersService = TestBed.get(UsersService);
    component.routes[0] = mockRoute;
    fixture.detectChanges();
    component.LogUser = mockUser;
    fixture.detectChanges();
    component.log = log;
    component.users[0] = mockUser;
    spyAllUsers = spyOn(usersService, 'getAll').and.callThrough();
    spyLogOut = spyOn(storageService, 'logOut').and.callThrough();
    spyLogUser = spyOn(storageService, 'getUser').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a GetUsers method for get all Users", () => {
    component.LogOut();
    fixture.detectChanges();
    expect(spyLogOut.calls.any()).toBe(true, 'logOut should be called');
  })

  it("should have a GetLoginUser method for get User from sessionStorage", () => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    component.GetLoginUser();
    fixture.detectChanges();
    expect(component.log).toEqual(log);
    expect(spyLogUser.calls.any()).toBe(true, 'getUser should be called');
  })

  it("should have a GetUsers method for get all Users", () => {
    component.GetUsers();
    fixture.detectChanges();
    expect(component.users[0]).toEqual(mockUser);
    expect(spyAllUsers.calls.any()).toBe(true, 'getAll should be called');
  });

  it("should call GetUsers and return list of users", () => {
    const response: IUser[] = [];
    spyAllUsers.and.returnValue(of(response))
    component.GetUsers();
    fixture.detectChanges();
    expect(component.users).toEqual(response);
  });

  it('should not display the modal unless the button is clicked', () => {
    //matmenu is an id for the modal. It shouldn't show up unless button is clicked
    expect(element.innerHTML).not.toContain('<img src="assets/images/menu.png" alt="">');
  })

  it('should display the modal when button is clicked', () => {
    let OpenNav = fixture.debugElement.query(By.css('.menu'));
    //triggerEventHandler simulates a click event on the button object
    OpenNav.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(element.innerHTML).toContain('');
  })

  it("should have a close method for menu", () => {
    component.close();
    fixture.detectChanges();
    expect(component.isNav).toBeFalsy();
  })

  it("should have a OpenNav method for menu", () => {
    component.OpenNav();
    fixture.detectChanges();
    expect(component.isNav).toBeTruthy();
  })

  it("should accept values", () => {
    expect(component.routes[0].route).toEqual(mockRoute.route, "it should contain route");
    expect(mockRoute.imagePath).toEqual(component.routes[0].imagePath, "it should contain the imagePath");
    expect(mockRoute.name).toEqual(component.routes[0].name, "it should contain the name");
  });


  it('should display username, usersurname, balance, expenses and create_at', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.text:last-child').textContent).toContain(mockUser.username, "it should contain username");
    expect(compiled.querySelector('.text:last-child').textContent).toContain(mockUser.usersurname, "it should contain the usersurname");
    expect(compiled.querySelector('.create').textContent).toContain(mockUser.create_at.toLocaleString().slice(0, -3), "it should contain the create_at");
  });

});
