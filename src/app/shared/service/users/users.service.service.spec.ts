import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from './users.service';
import { IUser } from '../../interface/user/user';
import { HttpEventType } from '@angular/common/http';
import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Inject } from '@angular/core';

describe('UsersService', () => {
  let usersService: UsersService;
  let httpTestingController: HttpTestingController;
  let baseUrl = "http://localhost:3000/users";
  let user: IUser;
  let savings: ISavings;
  let spends: ISpends;
  let httpClient:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    user = {
      'id': 2,
      'username': 'Pavlo',
      'usersurname': 'Pavliv',
      'email': 'pavliv@gmail.com',
      'password': '654321',
      'balance': 100000,
      'expenses': 50000,
      'income': 2000,
      'imagePath': '',
      'create_at': new Date('09.08.2022, 15:49')
    }
    usersService = TestBed.inject(UsersService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  // getAll()
  it("should return all users", () => {
    let result!: IUser[];
    usersService.getAll().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl
    });

    req.flush([user]);

    expect(result[0]).toEqual(user);
  });

  // getOne()
  it('should call getOne and return the appropriate user', () => {
    // Arrange
    const id = 1;

    // Act
    usersService.getOne(id).subscribe((data) => {

      // Assert
      expect(data).toEqual(user);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}/${id}`,
    });

    req.flush(user);
  });

  // updateUser()
  it('should call updateUser and return the updated user from the API', () => {
    const id = 3;
    const updatedUser: IUser = {
      'id': 3,
      'username': 'Ivan',
      'usersurname': 'Ivanov',
      'email': 'ivanov@gmail.com',
      'password': '123456',
      'balance': 990000,
      'expenses': 70000,
      'income': 1000,
      'imagePath': '',
      'create_at': new Date('09.08.2022, 15:49')
    };

    usersService.updateUser(id, user).subscribe((data) => {
      expect(data).toEqual(updatedUser);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
    });

    req.flush(updatedUser);
  });

  // updateIncome()
  it('should call updateIncome', () => {
    const id = 3;
    const updatedIncome = {
      'id': 3,
      'username': 'Ivan',
      'usersurname': 'Ivanov',
      'email': 'ivanov@gmail.com',
      'password': '123456',
      'balance': 990000,
      'expenses': 70000,
      'income': 10000,
      'imagePath': '',
      'create_at': new Date('09.08.2022, 15:49')
    };

    usersService.updateIncome(id, updatedIncome).subscribe((data) => {
      expect(data).toEqual(updatedIncome);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/income/${id}`,
    });

    req.flush(updatedIncome);
  });

  // updateBalance()
  it('should call updateBalance', () => {
    const id = 3;
    const updateBalance = {
      'id': 3,
      'username': 'Ivan',
      'usersurname': 'Ivanov',
      'email': 'ivanov@gmail.com',
      'password': '123456',
      'balance': 90000,
      'expenses': 70000,
      'income': 10000,
      'imagePath': '',
      'create_at': new Date('09.08.2022, 15:49')
    };

    usersService.updateBalance(id, updateBalance).subscribe((data) => {
      expect(data).toEqual(updateBalance);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/balance/${id}`,
    });

    req.flush(updateBalance);
  });

  // updateExpenses()
  it('should call updateExpenses', () => {
    const id = 3;
    const updateExpenses = {
      'id': 3,
      'username': 'Ivan',
      'usersurname': 'Ivanov',
      'email': 'ivanov@gmail.com',
      'password': '123456',
      'balance': 990000,
      'expenses': 8000,
      'income': 10000,
      'imagePath': '',
      'create_at': new Date('09.08.2022, 15:49')
    };

    usersService.updateExpenses(id, updateExpenses).subscribe((data) => {
      expect(data).toEqual(updateExpenses);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/expenses/${id}`,
    });

    req.flush(updateExpenses);
  });

  //  getAllSavings()
  it("should return all savings", () => {
    let result!: ISavings[];
    usersService.getAllSavings().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${baseUrl}/savings`
    });

    req.flush([savings]);

    expect(result[0]).toEqual(savings);
  });

  // updateSavings()
  it('should call updateSavings', () => {
    const id = 3;
    const updateSavings: ISavings = {
      'id': 3,
      'name': 'cash',
      'sum': 2000,
      'users_id': 1,
      'create_at': new Date('09.08.2022, 15:49')
    };

    usersService.updateSavings(id, savings).subscribe((data) => {
      expect(data).toEqual(updateSavings);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/savings/${id}`,
    });

    req.flush(updateSavings);
  });

  // getAllSpends()
  it("should return all spends", () => {
    let result!: ISpends[];
    usersService.getAllSpends().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${baseUrl}/spends`
    });

    req.flush([spends]);

    expect(result[0]).toEqual(spends);
  });

  // updateSpends()
  it('should call updateSpends', () => {
    const id = 2;
    const updateSpends: ISpends = {
      'id': 2,
      'name': 'food',
      'sum': 2000,
      'users_id': 2,
      'create_at': new Date('09.08.2022, 15:49')
    };

    usersService.updateSpends(id, spends).subscribe((data) => {
      expect(data).toEqual(updateSpends);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/spends/${id}`,
    });

    req.flush(updateSpends);
  });

  //  // handleError()
  //  it('should handle error when error.error instanceof ErrorEvent', () => {
  //   const id = 5;
  //   const updatedUser: IUser = {
  //     'id': 8,
  //     'username': 'Ivan',
  //     'usersurname': 'Ivanov',
  //     'email': 'ivanov@gmail.com',
  //     'password': '123456',
  //     'balance': 990000,
  //     'expenses': 70000,
  //     'income': 1000,
  //     'imagePath': '',
  //     'create_at': new Date('09.08.2022, 15:49')
  //   };
  //   let mockErrorResponse: HttpErrorResponse = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), status: 404, statusText: 'Bad Request', url: 'http://localhost:3000/', ok: false, type: HttpEventType.Response, name: 'HttpErrorResponse', message: 'Http failure response for http://localhost:3000/users/5: 404 Not Found', error: 'Invalid request parameters' };
  //   spyOn(usersService, 'handleError').and.callThrough();

  //   usersService.errorMessage = 'Http failure response for http://localhost:3000/users/5: 404 Not Found';
  //   usersService.updateUser(id, updatedUser).subscribe(
  //     data => fail('Should have failed with 404 error'),
  //     (error: HttpErrorResponse) => {
  //       // expect(error.error.message).toContain(`user has been updated successfully.`);
  //       expect(error.error.message).toContain("Error: the error message");
  //       expect(usersService.handleError).toHaveBeenCalled();
  //       // expect(usersService.errorMessage).toEqual(error.message);
  //     }
  //   );
  //   usersService.handleError(mockErrorResponse);
  //   const request = httpTestingController.expectOne({
  //     method: 'PUT',
  //     url: `${baseUrl}/${id}`,
  //   });
  //   request.flush(`user has been updated successfully.`, { status: 404, statusText: 'Not Found' });
  //   expect(request.request.method).toBe('PUT');

  //   // request.error(new HttpErrorResponse({error: 'the error message', status: 401}) as any);

  // });

  // it('should handleError',() => {
  //   const urlString = 'http://localhost:3000/users/8';
  //   const emsg = 'deliberate 404 error';

  //   spyOn(usersService, 'handleError').and.callThrough();

  //   usersService.getOne(8).subscribe(
  //       data => fail('should have failed with the 404 error'),
  //       (error: HttpErrorResponse) => {

  //         expect(usersService.handleError).toHaveBeenCalled(); // check if executed

  //         expect(error.status).toEqual(404, 'status');
  //         expect(error.error).toEqual(emsg, 'message');
  //       }
  // )
  //   const req = httpTestingController.expectOne(urlString);

  //   // Respond with mock error
  //   req.flush(emsg, { status: 404, statusText: 'Not Found' });
  //     })

  // handleError()
  it('should handle error', () => {
    const id = 5;
    const updatedUser: IUser = {
      'id': 8,
      'username': 'Ivan',
      'usersurname': 'Ivanov',
      'email': 'ivanov@gmail.com',
      'password': '123456',
      'balance': 990000,
      'expenses': 70000,
      'income': 1000,
      'imagePath': '',
      'create_at': new Date('09.08.2022, 15:49')
    };
    let mockErrorResponse: HttpErrorResponse = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), status: 400, statusText: 'Bad Request', url: 'http://localhost:3000/', ok: false, type: HttpEventType.Response, name: 'HttpErrorResponse', message: 'Http failure response for http://localhost:3000/: 400 Bad Request', error: 'Invalid request parameters' };
    spyOn(usersService, 'handleError').and.callThrough();
    usersService.updateUser(id, updatedUser).subscribe(
      data => fail('Should have failed with 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(400);
        expect(error.error).toContain(`Http failure response for http://localhost:3000/: 400 Bad Request`);
        expect(usersService.handleError).toHaveBeenCalled();
      }
    );
    usersService.handleError(mockErrorResponse);
    const request = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
    });
    request.flush(`Http failure response for http://localhost:3000/: 400 Bad Request`, { status: 400, statusText: 'Not Found' });
    expect(request.request.method).toBe('PUT');

  });

});

