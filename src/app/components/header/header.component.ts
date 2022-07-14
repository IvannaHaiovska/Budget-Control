import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UsersService } from 'src/app/shared/service/users/users.service';

import { IUser } from 'src/app/shared/interface/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public log: any;
  public LogUser: Array<IUser> = [];
  public users: Array<IUser> = [];

  constructor
    (private storageService: StorageService,
      private userService: UsersService) { }

  ngOnInit(): void {
    this.GetLoginUser();
    this.GetUsers();
  }

  LogOut() {
    this.storageService.logOut();
  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }

  GetUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });
  }
}
