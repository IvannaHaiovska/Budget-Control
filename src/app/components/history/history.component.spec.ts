import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HistoryComponent } from './history.component';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UsersService } from 'src/app/shared/service/users/users.service';

import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';

describe('HistoryComponent', () => {
  let historyComponent: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  const USER_KEY = 'auth-user';
  let storageService: StorageService;
  let usersService: UsersService;
  let spyLogUser: jasmine.Spy;
  let spySavings: jasmine.Spy;
  let spySpends: jasmine.Spy;
  let Savings: ISavings[];
  let mockLogSaving: ISavings;
  let Spends: ISpends[];
  let mockLogSpends: ISpends;
  let mockSavings: ISavings;
  let mockSpends: ISpends;
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
      declarations: [HistoryComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    historyComponent = fixture.componentInstance;
    fixture.detectChanges();
    historyComponent.log = log;
    mockSavings = { id: 1, name: 'cash', sum: 500, users_id: 1, create_at: new Date('09.08.2022, 15:49') }
    historyComponent.savings = mockSavings;
    fixture.detectChanges();
    storageService = TestBed.get(StorageService);
    usersService = TestBed.get(UsersService);
    mockSpends = { id: 1, name: 'girlfriend', sum: 500, users_id: 1, create_at: new Date('09.08.2022, 15:49') }
    historyComponent.spends = mockSpends;
    fixture.detectChanges();
    spyLogUser = spyOn(storageService, 'getUser').and.callThrough();
    spySavings = spyOn(usersService, 'getAllSavings').and.callThrough();
    spySpends = spyOn(usersService, 'getAllSpends').and.callThrough();
    Savings = [
      { id: 1, name: 'cash', sum: 500, users_id: 1, create_at: new Date('09.08.2022, 15:49') },
      { id: 2, name: 'bank', sum: 500, users_id: 1, create_at: new Date('09.08.2022, 15:49') },
      { id: 3, name: 'cash', sum: 500, users_id: 2, create_at: new Date('09.08.2022, 15:49') },
      { id: 4, name: 'bank', sum: 500, users_id: 2, create_at: new Date('09.08.2022, 15:49') },
      { id: 5, name: 'cash', sum: 500, users_id: 3, create_at: new Date('09.08.2022, 15:49') },
      { id: 6, name: 'bank', sum: 500, users_id: 3, create_at: new Date('09.08.2022, 15:49') }
    ];

    fixture.detectChanges();
    mockLogSaving = { id: 1, name: 'cash', sum: 500, users_id: 1, create_at: new Date('09.08.2022, 15:49') };

    Spends = [
      { id: 1, name: 'girlfriend', sum: 500, users_id: 1, create_at: new Date('09.08.2022, 15:49') },
      { id: 2, name: 'food', sum: 500, users_id: 1, create_at: new Date('09.08.2022, 15:49') },
      { id: 3, name: 'girlfriend', sum: 500, users_id: 2, create_at: new Date('09.08.2022, 15:49') },
      { id: 4, name: 'food', sum: 500, users_id: 2, create_at: new Date('09.08.2022, 15:49') },
      { id: 5, name: 'girlfriend', sum: 500, users_id: 3, create_at: new Date('09.08.2022, 15:49') },
      { id: 6, name: 'food', sum: 500, users_id: 3, create_at: new Date('09.08.2022, 15:49') }];

    mockLogSpends =
      { id: 4, name: 'food', sum: 500, users_id: 2, create_at: new Date('09.08.2022, 15:49') };
  });


  it('should create', () => {
    expect(historyComponent).toBeTruthy();
  });

  it("should have a GetLoginUser method for get User from sessionStorage", () => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(log));
    historyComponent.GetLoginUser();
    fixture.detectChanges();
    expect(historyComponent.log).toEqual(log);
    expect(historyComponent.LogUser).toEqual(log.user);
    expect(spyLogUser.calls.any()).toBe(true, 'getUser should be called');
  })

  it("should have a GetSavings method for get savings", () => {
    historyComponent.GetSavings();
    fixture.detectChanges();
    expect(historyComponent.savings).toEqual(mockSavings);
    expect(spySavings.calls.any()).toBe(true, 'getAllSavings should be called');
  })

  it('should have a GetSavings method for get savings and use pipe', () => {
    // given
    const sortedList = Savings;
    spySavings.and.returnValue(of(sortedList));
    // when
    historyComponent.GetSavings();

    // then
    const expected = mockLogSaving;
    expect(historyComponent.savings).toEqual(expected);
  });


  it("should have a GetSpends method for get spends", () => {
    historyComponent.GetSpends();
    fixture.detectChanges();
    expect(historyComponent.spends).toEqual(mockSpends);
    expect(spySpends.calls.any()).toBe(true, 'getAllSpends should be called');
  })

  it('should have a GetSpends method for get spends and use pipe', () => {
    // given
    const sortedList = Spends;
    spySpends.and.returnValue(of(sortedList));
    // when
    historyComponent.GetSpends();

    // then
    const expected = mockLogSpends;
    expect(historyComponent.spends).toEqual(expected);
  });

});
