import { Component, OnInit } from '@angular/core';
import { mergeMap, filter, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { UntypedFormControl } from '@angular/forms';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';
import { IUser } from 'src/app/shared/interface/user/user';

import * as Highcharts from 'highcharts/highstock';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';

import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class StatisticComponent implements OnInit {
  date = new UntypedFormControl(moment());
  public log: any;
  public LogUser!: IUser;
  public spends!: ISpends;
  public savings!: ISavings;
  public allsavings: ISavings[] = [];
  public allspends: ISpends[] = [];
  public allincome: any[] = [];
  public title = [{ name: 'Графік витрат' }, { name: 'Графік збережень' }, { name: 'Графік прибутку' }];
  public category = 'Графік витрат';
  public savingsBar: any[] = [];
  public spendsBar: any[] = [];
  public incomeBar: any[] = [];
  public month = '17/10/2022'
  public index = 0;
  public colors = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
  constructor(
    private storageService: StorageService,
    private userService: UsersService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.GetLoginUser()
    this.GetSavings();
    this.GetSpends();
    this.GetAllSavings();
    this.GetAllSpends();
    this.GetAllIncome();
    this.createChartSpends();
  }

  GetAllSavings() {
    this.userService.getAllSavings().subscribe(res => {
      res.map(item => {
        if (item.users_id === this.LogUser.id) {
          this.allsavings.push(item);
        }
      })
    })
  }

  GetAllSpends() {
    this.userService.getAllSpends().subscribe(res => {
      res.map(item => {
        if (item.users_id === this.LogUser.id) {
          this.allspends.push(item);
        }
      })
    })
  }

  GetAllIncome() {
    this.userService.getHistory().subscribe(res => {
      res.map(item => {
        if ((item.users_id === this.LogUser.id) && (item.category === 'income')) {
          this.allincome.push(item);
        }
      })
    })
  }


  private createChartSpends(): void {
    const data: any[] = [];
    this.userService.getAllSpends().subscribe(res => {
      this.spendsBar = res;
      for (let i = 0; i < this.spendsBar.length; i++) {
        this.spendsBar[i].create_at = this.datepipe.transform(this.spendsBar[i].create_at, 'yyyy-MM-dd');
        if ((this.spendsBar[i].users_id === this.LogUser.id) && (this.spendsBar[i].create_at.substr(5, 2) === this.month.substr(3, 2)) && (this.spendsBar[i].create_at.substr(0, 4) === this.month.substr(6, 4))) {
          data.push({
            name: this.spendsBar[i].name,
            y: Math.floor(this.spendsBar[i].sum * 100 / Math.max(this.LogUser.balance)),
          });
        }
      }
      Highcharts.chart('chart-spending' as any, {
        chart: {
          type: 'column',
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          min: 0,
          title: undefined,
        },
        xAxis: {
          type: 'category',
          title: {
            text: null
          },
          min: 0,
          max: 4,
          scrollbar: {
            enabled: true,
            barBackgroundColor: 'rgba(211, 211, 211, 0.283)',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'rgba(211, 211, 211, 0.283)',
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: 'none',
            trackBorderWidth: 1,
            trackBorderRadius: 8,
            trackBorderColor: 'rgba(211, 211, 211, 0.283)'
          },
          tickLength: 0,
        },
        tooltip: {
          headerFormat: `<div>Date: {point.key}</div>`,
          pointFormat: `<div>{series.name}: {point.y}</div>`,
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            },
          }
        },
        series: [{
          colorByPoint: true,
          name: 'Votes',
          data,
        }],
      } as any);
    })
  }

  private createChartSaving(): void {
    const data: any[] = [];
    this.userService.getAllSavings().subscribe(res => {
      this.savingsBar = res;
      for (let i = 0; i < this.savingsBar.length; i++) {
        this.savingsBar[i].create_at = this.datepipe.transform(this.savingsBar[i].create_at, 'yyyy-MM-dd');
        if ((this.savingsBar[i].users_id === this.LogUser.id) && (this.savingsBar[i].create_at.substr(5, 2) === this.month.substr(3, 2)) && (this.savingsBar[i].create_at.substr(0, 4) === this.month.substr(6, 4))) {
          data.push({
            name: this.savingsBar[i].name,
            y: Math.floor(this.savingsBar[i].sum * 100 / this.LogUser.balance),
          });
        }
      }
      Highcharts.chart('chart-saving' as any, {
        chart: {
          type: 'column',
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          min: 0,
          title: undefined,
        },
        xAxis: {
          type: 'category',
          title: {
            text: null
          },
          min: 0,
          max: 4,
          scrollbar: {
            enabled: true,
            barBackgroundColor: 'rgba(211, 211, 211, 0.283)',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'rgba(211, 211, 211, 0.283)',
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: 'none',
            trackBorderWidth: 1,
            trackBorderRadius: 8,
            trackBorderColor: 'rgba(211, 211, 211, 0.283)'
          },
          tickLength: 0,
        },
        tooltip: {
          headerFormat: `<div>Date: {point.key}</div>`,
          pointFormat: `<div>{series.name}: {point.y}</div>`,
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            },
          }
        },
        series: [{
          colorByPoint: true,
          name: 'Votes',
          data,
        }],
      } as any);
    })
  }

  private createChartIncome(): void {
    const data: any[] = [];
    this.userService.getHistory().subscribe(res => {
      this.incomeBar = res;
      for (let i = 0; i < this.incomeBar.length; i++) {
        this.incomeBar[i].create_at = this.datepipe.transform(this.incomeBar[i].create_at, 'yyyy-MM-dd');
        if ((this.incomeBar[i].users_id === this.LogUser.id) && (this.incomeBar[i].create_at.substr(5, 2) === this.month.substr(3, 2)) && (this.incomeBar[i].create_at.substr(0, 4) === this.month.substr(6, 4)) && this.incomeBar[i].category == 'income') {
          data.push({
            name: this.incomeBar[i].name,
            y: Math.floor(this.incomeBar[i].sum * 100 / this.LogUser.balance),
          });
        }
      }

      Highcharts.chart('chart-income' as any, {
        chart: {
          type: 'column',
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          min: 0,
          title: undefined,
        },
        xAxis: {
          type: 'category',
          title: {
            text: null
          },
          min: 0,
          max: 4,
          scrollbar: {
            enabled: true,
            barBackgroundColor: 'rgba(211, 211, 211, 0.283)',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'rgba(211, 211, 211, 0.283)',
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: 'none',
            trackBorderWidth: 1,
            trackBorderRadius: 8,
            trackBorderColor: 'rgba(211, 211, 211, 0.283)'
          },
          tickLength: 0,
        },
        tooltip: {
          headerFormat: `<div>Date: {point.key}</div>`,
          pointFormat: `<div>{series.name}: {point.y}</div>`,
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            },
          }
        },
        series: [{
          colorByPoint: true,
          name: 'Votes',
          data,
        }],
      } as any);
    })
  }

  plusOne() {
    this.index = this.index + 1;
    this.category = this.title[this.index].name;
    if (this.category === 'Графік витрат') {
      this.createChartSpends();
    }
    else if (this.category === 'Графік збережень') {
      this.createChartSaving();
    }

    else if (this.category === 'Графік прибутку') {
      this.createChartIncome()
    }

  }
  minusOne() {
    this.index = this.index - 1;
    this.category = this.title[this.index].name;
    if (this.category === 'Графік витрат') {
      this.createChartSpends();
    }
    else if (this.category === 'Графік збережень') {
      this.createChartSaving();
    }
    else if (this.category === 'Графік прибутку') {
      this.createChartIncome()
    }
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.month = moment(this.date.value).format('DD/MM/YYYY');
    console.log(this.month);
    if (this.category === 'Графік витрат') {
      this.createChartSpends();
    }
    else if (this.category === 'Графік збережень') {
      this.createChartSaving();
    }
    else if (this.category === 'Графік прибутку') {
      this.createChartIncome()
    }
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
    })
  }

  GetSpends() {
    this.userService.getAllSpends().pipe(
      mergeMap(task => task),
      filter(item => item.users_id === this.LogUser.id),
      catchError(error => { throw `Something wrong ${error.message}` }
      )
    ).subscribe(res => {
      this.spends = res;
    })
  }

}
