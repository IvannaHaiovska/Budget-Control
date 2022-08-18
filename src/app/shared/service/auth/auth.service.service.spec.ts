import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { IUser } from '../../interface/user/user';

describe('Auth.Service', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let baseUrl = "http://localhost:3000/auth";
  let user: IUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule], 
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should call login', () => {
      const email ='ivanov@gmail.com';
      const password ='123456';
      const logUser: IUser = {
        'id': 3,
        'username': 'Ivan',
        'usersurname': 'Ivanov',
        'email': 'ivanov@gmail.com',
        'password': '123456',
        'balance': 990000,
        'expenses': 70000,
        'income': 1000,
        'imagePath': '',
        'create_at':new Date('09.08.2022, 15:49')
      };

      authService.login(email, password).subscribe((data) => {
      expect(data).toEqual(logUser);
    });

    const req = httpTestingController.expectOne({
      method: 'Post',
      url: `${baseUrl}/signup`,
    });
    req.flush(logUser);
  });

  it('should call logout', () => {
    const logUser: IUser = {
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

    authService.logout().subscribe((data) => {
    expect(data).toEqual(logUser);
  });

  const req = httpTestingController.expectOne({
    method: 'Post',
    url: `${baseUrl}signout`,
  });
  req.flush(logUser);
});

});
