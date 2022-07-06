import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/shared/service/users/users.service';

import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public log: any;
  public LogUser: any;
  public clickIncome = false;
  public clickSaving = false;
  public clickSaving1 = false;
  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.GetLoginUser();
  }
  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }
  Income() {
    this.clickIncome = true;
  }
  Saving1() {
    this.clickSaving1 = false;
    if (this.clickIncome === true) {
      this.clickIncome = false;
    }
    else {
      this.clickSaving = true;
    }
    confirm();
  }
  Saving2() {
    this.clickSaving = false;
    if (this.clickIncome === true) {
      this.clickIncome = false;
    }
    else {
      this.clickSaving1 = true;
    }
    confirm();
  }

  Spends() {
    if (this.clickSaving && this.clickSaving1) {
      confirm();
    }
    else {
      alert("Please activate any of the saving buttons")
    }
  }
}
