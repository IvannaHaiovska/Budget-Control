import { Component, OnInit,  ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import { mergeMap, filter, catchError } from 'rxjs/operators';

import {UntypedFormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';
import { IUser } from 'src/app/shared/interface/user/user';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
// import { StatsBarChart } from 'src/app/shared/interface/data';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class StatisticComponent implements OnInit {
  date = new UntypedFormControl(moment());
  public log: any;
  public LogUser!: IUser;
  public spends!: ISpends;
  public savings!: ISavings;
  public allsavings: any[] = [];

  width!: number;
  height!: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  StatsBar:any[]= [];

// якщо піставляю ці дані то графік працює
public StatsBarChart= [
     {name: 'bank', sum: 5},
    {name: 'cash', sum: 16},
    {name: 'certificates of deposit', sum: 15},
     {name: 'cash', sum: 5},
     {name: 'bank', sum: 15},
    {name: 'bank', sum: 5},
    {name: 'certificates of deposit', sum: 15},
     {name: 'cash', sum: 5},
     {name: 'bank', sum: 15},
    {name: 'bank', sum: 15},
     {name: 'bank', sum: 15},
    {name: 'cash', sum: 5},
    {name: 'bank', sum: 5}
  ];

  constructor(
    private storageService: StorageService,
    private userService: UsersService
  ) { 
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {
    this.GetLoginUser()
    this.GetSavings();
    this.GetSpends();
    this.GetAllSavings();

    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

 GetAllSavings() {
    this.userService.getAllSavings().subscribe(res => {
      for(let i=0; i<res.length; i++){
        if (res[i].users_id === this.LogUser.id) {
          // якщо підставляю ці, що потрібно тобто весь обсяг з бази даних то не відображає графік
          this.StatsBar[i]= {name: res[i].name, sum:res[i].sum
        }
      }
    }
      res.map(item => {
        if (item.users_id === this.LogUser.id) {
          this.allsavings.push(item);
        }
      })
    })

  }
  initSvg() {
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.StatsBar.map((d:any) => d.name));
    this.y.domain([0, d3Array.max(this.StatsBar, (d:any) =>  d.sum)]);
  }

  drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Sum');
  }

  drawBars() {
    
    this.g.selectAll('.bar')
      .data(this.StatsBar)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.x(d.name))
      .attr('y', (d: any) => this.y(d.sum))
      .attr('width', this.x.bandwidth())
      .attr('fill', '#498bfc')
      .attr('height', (d: any) => this.height - this.y(d.sum));
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
  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }
  getRandomColor() {
    // let color = Math.floor(0x1000000 * Math.random()).toString(16);
    // return '#' + ('000000' + color).slice(-6);
  }

  GetSavings() {
    this.userService.getAllSavings().pipe(
      mergeMap(task => task),
      filter(item => item.users_id === this.LogUser.id),
      catchError(error => { throw `Something wrong ${error.message}` }
      )
    ).subscribe(res => {
      this.savings = res;
      // console.log(res)
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
      // console.log(res)
    }

    )
  }

}
