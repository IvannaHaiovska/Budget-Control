import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public log: any;
  public LogUser:any;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.GetLoginUser()
  }
  LogOut() {
    this.storageService.logOut();
  }
  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }
}
