import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { IUser } from 'src/app/shared/interface/user/user';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UsersService } from 'src/app/shared/service/users/users.service';

import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockSavings: ISavings[];
  let mockSpends: ISpends[];
  let mockLogSaving: ISavings[];
  let mockLogSpends: ISpends[];
  let mockResult!: string;
  const USER_KEY = 'auth-user';
  let mockUser!: IUser[];
  let storageService: StorageService;
  let usersService: UsersService;
  let spyLogUser: jasmine.Spy;
  let spyAllUsers: jasmine.Spy;
  let spyGetSavings: jasmine.Spy;
  let spyGetSpends: jasmine.Spy;
  let spyUpdateIncome: jasmine.Spy;
  let spyUpdateSavings: jasmine.Spy;
  let spyUpdateBalance: jasmine.Spy;
  let spyUpdateExpenses: jasmine.Spy;
  let spyUpdateSpends: jasmine.Spy;
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
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockUser = [{ id: 1, username: 'Ira', usersurname: 'Pankiv', email: 'pankiv@gmail.com', password: '123456', balance: 10000, expenses: 8000, income: 500, imagePath: 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png', create_at: new Date('09.08.2022, 15:49') },
    { id: 2, username: 'Pavlo', usersurname: 'Pavliv', email: 'pavliv@gmail.com', password: '654321', balance: 100000, expenses: 50000, income: 2000, imagePath: 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png', create_at: new Date('09.08.2022, 15:49') },
    { id: 3, username: 'Ivan', usersurname: 'Ivanov', email: 'ivanov@gmail.com', password: '123456', balance: 990000, expenses: 70000, income: 1000, imagePath: 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png', create_at: new Date('09.08.2022, 15:49') },]
    spyOn(window, 'alert');

    mockResult = '10';

    mockSavings = [
      { id: 1, name: 'cash', sum: 500, users_id: 1, createdAt: new Date('09.08.2022, 15:49') },
      { id: 2, name: 'bank', sum: 500, users_id: 1, createdAt: new Date('09.08.2022, 15:49') },
      { id: 3, name: 'cash', sum: 500, users_id: 2, createdAt: new Date('09.08.2022, 15:49') },
      { id: 4, name: 'bank', sum: 500, users_id: 2, createdAt: new Date('09.08.2022, 15:49') }, { id: 5, name: 'cash', sum: 500, users_id: 3, createdAt: new Date('09.08.2022, 15:49') },
      { id: 6, name: 'bank', sum: 500, users_id: 3, createdAt: new Date('09.08.2022, 15:49') }
    ];

    fixture.detectChanges();
    mockLogSaving = [
      { id: 3, name: 'cash', sum: 500, users_id: 2, createdAt: new Date('09.08.2022, 15:49') },
      { id: 4, name: 'bank', sum: 500, users_id: 2, createdAt: new Date('09.08.2022, 15:49') }];

    component.savings = mockLogSaving;
    mockSpends = [
      { id: 1, name: 'girlfriend', sum: 500, users_id: 1, createdAt: new Date('09.08.2022, 15:49') },
      { id: 2, name: 'food', sum: 500, users_id: 1, createdAt: new Date('09.08.2022, 15:49') },
      { id: 3, name: 'girlfriend', sum: 500, users_id: 2, createdAt: new Date('09.08.2022, 15:49') },
      { id: 4, name: 'food', sum: 500, users_id: 2, createdAt: new Date('09.08.2022, 15:49') },
      { id: 5, name: 'girlfriend', sum: 500, users_id: 3, createdAt: new Date('09.08.2022, 15:49') },
      { id: 6, name: 'food', sum: 500, users_id: 3, createdAt: new Date('09.08.2022, 15:49') }];

    mockLogSpends = [
      { id: 3, name: 'girlfriend', sum: 500, users_id: 2, createdAt: new Date('09.08.2022, 15:49') },
      { id: 4, name: 'food', sum: 500, users_id: 2, createdAt: new Date('09.08.2022, 15:49') }
    ];
    component.spends = mockLogSpends;
    fixture.detectChanges();
    component.log = log;
    component.users = mockUser;
    component.selectStart = 2;
    component.LogUser = mockUser[1];
    component.keyBinding = [{ charCode: 49, value: 1 }, { charCode: 50, value: 2 }];

    component.updateSavings = {
      id: log.user.id, sum: 500
    };
    component.updateSpends = {
      id: log.user.id, sum: 500
    };
    component.updateExpenses = {
      id: log.user.id, expenses: 300
    };

    component.updateUser = {
      id: log.user.id,
      income: 2000
    };
    component.result = mockResult;

    storageService = TestBed.get(StorageService);
    usersService = TestBed.get(UsersService);

    spyLogUser = spyOn(storageService, 'getUser').and.callThrough();
    spyAllUsers = spyOn(usersService, 'getAll').and.callThrough();
    spyGetSavings = spyOn(usersService, 'getAllSavings').and.callThrough();
    spyGetSpends = spyOn(usersService, 'getAllSpends').and.callThrough();
    spyUpdateIncome = spyOn(usersService, 'updateIncome').and.callThrough();
    spyUpdateSavings = spyOn(usersService, 'updateSavings').and.callThrough();
    spyUpdateBalance = spyOn(usersService, 'updateBalance').and.callThrough();
    spyUpdateExpenses = spyOn(usersService, 'updateExpenses').and.callThrough();
    spyUpdateSpends = spyOn(usersService, 'updateSpends').and.callThrough();
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
    expect(spyLogUser.calls.any()).toBe(true, 'getUser should be called');
  })


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

  it("should have a GetSavings method for get savings", () => {
    component.GetSavings();
    fixture.detectChanges();
    expect(component.savings).toEqual(mockLogSaving);
    expect(spyGetSavings.calls.any()).toBe(true, 'getAllSavings should be called');
  })

  it('should have a GetSavings method for get savings and use map', () => {
    // given
    const sortedList = mockSavings;
    spyGetSavings.and.returnValue(of(sortedList));
    // when
    component.GetSavings();

    // then
    const expected = mockLogSaving;
    expect(component.savings).toEqual(expected);
  });

  it("should have a GetSpends method for get spends", () => {
    component.GetSpends();
    fixture.detectChanges();
    expect(component.spends).toEqual(mockLogSpends);
    expect(spyGetSpends.calls.any()).toBe(true, 'getAllSpends should be called');
  })

  it('should have a GetSpends method for get spends and use map', () => {
    // given
    const sortedList = mockSpends;
    spyGetSpends.and.returnValue(of(sortedList));
    // when
    component.GetSpends();

    // then
    const expected = mockLogSpends;
    expect(component.spends).toEqual(expected);
  });

  it("should call GetSpends and return list of users", () => {
    component.LogUser = { id: 2, username: 'Pavlo', usersurname: 'Pavliv', email: 'pavliv@gmail.com', password: '654321', balance: 100000, expenses: 50000, income: 2000, imagePath: 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png', create_at: new Date('09.08.2022, 15:49') };

    const response: ISpends[] = [];
    spyGetSpends.and.returnValue(of(response))
    component.GetSpends();
    fixture.detectChanges();
    expect(component.allspends).toEqual(response);
  });
  it('should display name and sum of savings', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.savings:first-child').textContent).toContain(mockLogSaving[0].name, "it should contain name");
    expect(compiled.querySelector('.sumsaving').textContent).toContain(mockLogSaving[0].sum, "it should contain the sum");

  })

  it('should display name and sum of spends', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.spends:first-child').textContent).toContain(mockLogSpends[0].name, "it should contain name");
    expect(compiled.querySelector('.sumspends').textContent).toContain(mockLogSpends[0].sum, "it should contain the sum");
  })

  it("should have a Income method for backlight Savings items", () => {
    component.Income();
    fixture.detectChanges();
    expect(component.clickIncome).toBeTruthy();
    expect(component.clickSaving).toBeFalsy();
  })

  it("should have a Saving method for open Calculator when Income was click", () => {
    component.clickIncome = true;
    component.Saving(mockLogSaving[0]);
    fixture.detectChanges();
    expect(component.calculate).toBeTruthy();
    expect(component.clickSaving).toBeFalsy();
    expect(component.activeSaving).toEqual(mockLogSaving[0]);
  })

  it("should have a Saving method for backlight Spends items", () => {
    component.Saving(mockLogSaving[0]);
    fixture.detectChanges();
    expect(component.clickSaving).toBeTruthy();
    expect(component.calculate).toBeFalsy();
    expect(component.activeSaving).toEqual(mockLogSaving[0]);
  })


  it("should have a Spends method when savings button activate", () => {
    component.clickSaving = true;
    component.Spends(mockLogSpends[0]);
    fixture.detectChanges();
    expect(component.calculate).toBeTruthy();
    expect(component.clickSaving).toBeFalsy();
    expect(component.clickIncome).toBeFalsy();
    expect(component.activeSpend).toEqual(mockLogSpends[0]);
  })

  it("should have a Spends method when savings button don't activate", () => {
    component.activeSaving = undefined;
    component.Spends(mockLogSpends[0]);
    fixture.detectChanges();
    expect(component.calculate).toBeFalse();
    expect(component.clickSaving).toBeFalsy();
    expect(component.activeSpend).toEqual('');
    expect(window.alert).toHaveBeenCalledWith('Please activate any of the saving buttons');
  })

  it("should have a close method for close calculator", () => {
    component.close();
    fixture.detectChanges();
    expect(component.calculate).toBeFalsy();
    expect(component.clickIncome).toBeFalsy();
    expect(component.clickSaving).toBeFalsy();
    expect(component.inputEmpty).toBeFalsy();
    expect(component.input).toEqual('');
    expect(component.activeSpend).toEqual('');
    expect(component.activeSaving).toEqual('');
  })

  it('should call preventDefault is BackSpace is pressed', () => {

    component.input = '5+6'
    const eventInit: KeyboardEventInit = {
      key: "Backspace",
      keyCode: 8,
    };

    const event = new KeyboardEvent('keydown', eventInit);

    const preventDefaultSpy = spyOn(event, 'preventDefault').and.stub();
    component.onKeyDown(event);

    component.selectStart = 2;
    expect(preventDefaultSpy).toHaveBeenCalled();
  });



  it('should call preventDefault is number 1 is pressed', () => {
    const eventInit: KeyboardEventInit = {
      key: '1',
      charCode: 49
    };

    const event = new KeyboardEvent('keydown', eventInit);
    const preventDefaultSpy = spyOn(event, 'preventDefault').and.stub();
    component.onKeyPress(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should call pressNum when click is .', () => {
    component.pressNum(".");
    component.input = '12'
    expect(component.getLastOperand()).toBeTruthy();
  });

  it('should call pressNum when click is 0', () => {
    component.pressNum("0");
    component.input = ''
    expect(component.input.toString()).toEqual('');
  });

  it('should call pressNum when click is /', () => {
    component.pressNum("0");
    component.input = '54/6'
    expect(component.input.toString()).toEqual('54/6');

  });

  it('should call getLastOperand when last is -', () => {
    component.input = '2-'
    expect(component.getLastOperand()).toEqual(component.input.substr(2 + 1));
  });

  it('should call getLastOperand when last is /', () => {
    component.input = '2/'
    expect(component.getLastOperand()).toEqual(component.input.substr(2 + 1));
  });

  it('should call getLastOperand when last is +', () => {
    component.input = '2+'
    expect(component.getLastOperand()).toEqual(component.input.substr(2 + 1));
  });

  it('should call getLastOperand when last is *', () => {
    component.input = '2*'
    expect(component.getLastOperand()).toEqual(component.input.substr(2 + 1));
  });

  it('should call pressOperator', () => {
    component.input = '2+3';
    component.pressOperator('+')
    expect(component.input.toString()).toEqual('2+3+');
  })
  it('should call clear', () => {
    component.input = '2*3';
    component.clear()
    expect(component.input).toEqual('2*');
  });

  it('should call getAnswer', () => {
    component.input = '2*3';
    component.getAnswer()
    expect(component.input.toString()).toEqual('6');
  });

  it('should call getAnswer when input=0', () => {
    component.input = '0';
    component.getAnswer()
    expect(component.input.toString()).toEqual('');
  });

  it('should call PushResult when input is empty', () => {
    component.input = '';
    component.PushResult()
    expect(component.inputEmpty).toBeTruthy();
  });


  it('should call PushResult when input is not empty and if savings not null', () => {
    component.input = '2';
    component.activeSpend = '';
    component.activeSaving = mockLogSaving[0];
    component.PushResult();
    fixture.detectChanges();
    expect(component.updateSavings).toEqual({
      id: 3, sum: '50010'
    });
    expect(component.updateUser).toEqual({
      id: 2, income: 1990
    });
    expect(spyUpdateIncome.calls.any()).toBe(true, 'updateIncome should be called');
    expect(spyUpdateSavings.calls.any()).toBe(true, 'updateSavings should be called');
    expect();

  });

  it('should call PushResult when input is not empty and if Spend not null', () => {
    component.input = '2';
    component.activeSaving = '';
    component.activeSpend = mockLogSpends[0];
    component.activateSavSpen = mockLogSaving[0];

    component.PushResult()
    expect(component.updateSpends).toEqual({
      id: 3, sum: '50010'
    });
    expect(component.updateExpenses).toEqual({
      id: 2, expenses: '5000010'
    });
    expect(spyUpdateBalance.calls.any()).toBe(true, 'updateBalance should be called');
    expect(spyUpdateExpenses.calls.any()).toBe(true, 'updateExpenses should be called');
    expect(spyUpdateSavings.calls.any()).toBe(true, 'updateSavings should be called');
    expect(spyUpdateSpends.calls.any()).toBe(true, 'updateSpends should be called');
  });


});
