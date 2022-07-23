import { Component, OnInit } from '@angular/core';
import { mergeMap, filter, catchError } from 'rxjs/operators';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

import { IUser } from 'src/app/shared/interface/user/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public log: any;
  public LogUser!: IUser;

  constructor(
    private storageService: StorageService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.GetLoginUser()
  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
    console.log(this.LogUser);
  }

}
