import { Component, OnInit } from '@angular/core';
import { mergeMap, filter, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { ViewEncapsulation} from '@angular/core';

import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HistoryComponent implements OnInit {
 
  public log: any;
  public LogUser: any;
  public spends!: ISpends;
  public savings!: ISavings;
  public allspends: ISpends[]=[];
  public allsavings: any[]=[];
  public history: any[]=[];

  public tabs = [
    {name:'Jan', num: '01' },
    {name:'Feb', num: '02' },
    {name:'Mar', num: '03' },
    {name:'Apr', num: '04' },
    {name:'May', num: '05' },
    {name:'Jun', num: '06' },
    {name:'Jul', num: '07' },
    {name:'Aug', num: '08' },
    {name:'Sep', num: '09' },
    {name:'Oct', num: '10' },
    {name:'Nov', num: '11' },
    {name:'Dec', num: '12' }];
 public displayedColumns = {income:'income', spends:'spends', savings:'savings', edit:'edit'};
public tabIndex = 9;
public year =2022;
  constructor(
    private storageService: StorageService,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.GetLoginUser()
    this.GetSavings();
    this.GetSpends();
    this.GetHistory();
  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
    console.log(this.LogUser);
    
  }

  GetSavings() {
    this.userService.getAllSavings().pipe(
      mergeMap(task => task),
      filter(item => item.users_id === this.LogUser.id),
      catchError(error => { throw `Something wrong ${error.message}` }
      )
    ).subscribe(res => {
      this.allsavings.push(res);
      this.savings = res;
      console.log(`Savings history for ${res.name}:`, res)
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
      this.allspends.push(res);
      this.spends = res;
      console.log(`Spends history for ${res.name}:`, res);
    }
    )
  }

  
  GetHistory() {
    this.userService.getHistory().subscribe(data=>{
      console.log(data); 
      this.history = data;
    })
  }


plusOne(){
  this.year = this.year+1;
}
minusOne(){
  this.year = this.year-1;
}
}
