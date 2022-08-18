import { Component, OnInit } from '@angular/core';
import { mergeMap, filter, catchError } from 'rxjs/operators';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';
import { IUser } from 'src/app/shared/interface/user/user';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  public log: any;
  public LogUser!: IUser;
  public spends!: ISpends;
  public savings!: ISavings;

  constructor(
    private storageService: StorageService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.GetLoginUser()
    this.GetSavings();
    this.GetSpends();
  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }

  GetSavings() {
    this.userService.getAllSavings().pipe(
      mergeMap(task => task),
      filter(item => item.users_id === this.LogUser.id),
      catchError(error => { throw `Something wrong ${error.message}` }
      )
    ).subscribe(res => {
      this.savings = res;
      console.log(res)
    }

    )
  }

  GetSpends() {
    this.userService.getAllSpends().pipe(
      mergeMap(task => task),
      filter(item => item.users_id === this.LogUser.id),
      catchError(error => { throw `Something wrong ${error.message}` }
      )
    ).subscribe(res => {
      this.spends = res;
      console.log(res)
    }

    )
  }

}
