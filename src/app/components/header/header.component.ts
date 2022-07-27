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
  public LogUser!: IUser;
  public users: Array<IUser> = [];
  public routes = [
    { route: '/my-profile', name: 'My Profile', imagePath:'assets/images/profile.png' },
    { route: '/statistic', name: 'Statistic', imagePath:'assets/images/bar-chart.png' },
    { route: '/history', name: 'History', imagePath:'assets/images/calendar (1).png' }
  ];
  public isNav = false;

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
    console.log(this.LogUser );
  }
  GetUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });
  }

  OpenNav() {
    this.isNav = true;
  }
  close(){
    this.isNav = false;
  }
}
