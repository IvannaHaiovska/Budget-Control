import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UsersService } from 'src/app/shared/service/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  };
  public isSignInFailed = false;
  public errorMessage = '';
  public users: any;

  constructor(private authService: AuthService,
    private storageService: StorageService,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    })
  }
  onLogin() {
    const { email, password } = this.form;
    this.users.map((user: any) => {
      if ((user.email === email)&&(user.password===password)) {
        this.isSignInFailed = false;
        this.authService.login(email, password).subscribe({
          next: data => {
            this.storageService.saveUser(data);
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        })
      }
      else {
        this.isSignInFailed = true;
      }
    })
  }

}

