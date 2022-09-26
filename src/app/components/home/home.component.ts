import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

import { IUser } from 'src/app/shared/interface/user/user';
import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public log: any;
  public LogUser!: IUser;
  public clickIncome = false;
  public clickSaving = false;
  public calculate = false;
  public inputEmpty = false;
  public create = false;
  public createSav = false;
  public createSp = false;
  public name!: string;
  public sum!: number;
  public category: any;
  public activeSaving: any;
  public activeSpend: any;
  public activateSavSpen: any;
  public selectStart!: number;
  public users: Array<IUser> = [];
  public updateUser: any;
  public updateExpenses: any;
  public updateSavings: any;
  public updateSpends: any;
  public spends: any[] = [];
  public savings: any[] = [];
  public allspends: ISpends[] = [];
  public allsavings: ISavings[] = [];
  public input: string = '';
  public result: string = '';
  public keyBinding = [
    { charCode: 49, value: 1 },
    { charCode: 50, value: 2 },
    { charCode: 51, value: 3 },
    { charCode: 52, value: 4 },
    { charCode: 53, value: 5 },
    { charCode: 54, value: 6 },
    { charCode: 55, value: 7 },
    { charCode: 56, value: 8 },
    { charCode: 57, value: 0 },
    { charCode: 48, value: 0 },
    { charCode: 44, value: '.' },
    { charCode: 45, value: '.' },
    { charCode: 46, value: '.' },
    { charCode: 47, value: '/' },
    { charCode: 42, value: '*' },
    { charCode: 45, value: '-' },
    { charCode: 43, value: '+' }
  ];
  public history: any;
  constructor(
    private storageService: StorageService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.GetLoginUser();
    this.GetUsers();
    this.GetSavings();
    this.GetSpends();
  }

  GetUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });
  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }

  GetSavings() {
    this.userService.getAllSavings().subscribe(res => {
      this.allsavings = res;
      res.map(item => {
        if (item.users_id === this.LogUser.id) {
          this.savings.push(item);
        }
      })
    })
  }

  GetSpends() {
    this.userService.getAllSpends().subscribe(res => {
      this.allspends = res;
      res.map(item => {
        if (item.users_id === this.LogUser.id) {
          this.spends.push(item);
        }
      })
    })
  }

  createSavings() {
    this.createSav = true;
    this.create = true;
    this.createSp = false;
  }

  createSpends() {
    this.createSp = true;
    this.create = true;
    this.createSav = false;
  }

  createCategory() {
    this.category = {
      name: this.name,
      sum: this.sum,
      users_id: this.LogUser.id
    }
    if (this.createSav == true) {
      this.userService.createSavings(this.category).subscribe(() => {
        console.log('History create successfully!')
      }, (err) => {
        console.log(err);
      });
      this.Reload();
    }
    else if (this.createSp == true) {
      this.userService.createSpends(this.category).subscribe(() => {
        console.log('History create successfully!')
      }, (err) => {
        console.log(err);
      });
      this.Reload();
    }
    this.create = false;
    this.createSav = false;
    this.createSp = false;
  }

  Income() {
    this.clickIncome = true;
    this.clickSaving = false;
  }

  Saving(index: ISavings) {
    this.activeSaving = index;
    if (this.clickIncome === true) {
      this.clickIncome = false;
      this.calculate = true;
    }
    else {
      this.clickSaving = true;
      this.calculate = false;
    }
  }

  Spends(index: ISpends) {
    this.activeSpend = index;
    if (this.clickSaving == true) {
      this.clickIncome = false;
      this.clickSaving = false;
      this.calculate = true;
      this.activateSavSpen = this.activeSaving;
      this.activeSaving = '';
    }
    else if (this.activeSaving == undefined || this.activeSaving == '') {
      this.calculate = false;
      alert("Please activate any of the saving buttons");
      this.activeSpend = '';
    }
    this.clickSaving = false;
  }

  close() {
    this.calculate = false;
    this.clickIncome = false;
    this.clickSaving = false;
    this.input = '';
    this.activeSpend = '';
    this.activeSaving = '';
    this.inputEmpty = false;
    this.create = false;
  }

  onKeyDown(event: any) {
    console.log(event);

    if (event.keyCode === 8 || event.keyCode === 37) {
      event.preventDefault();
      this.selectStart = 2;
      this.input = this.input.slice(0, this.selectStart - 1) + this.input.slice(this.selectStart);
    }
  }

  onKeyPress(event: any) {
    for (const binding of this.keyBinding) {
      if (event.charCode === binding.charCode) {
        event.preventDefault();
        this.pressNum(binding.value);
      }
      else if (event.charCode === 61) {
        event.preventDefault();
        this.getAnswer();
      }
    }
  }

  pressNum(num: any) {
    //Do Not Allow . more than once
    if (num == ".") {
      if (this.input != "") {
        const lastNum = this.getLastOperand()
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num == "0") {
      if (this.input == "") {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }

    this.input = this.input + num
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    console.log('Last ' + this.input.substr(pos + 1))
    return this.input.substr(pos + 1)
  }

  pressOperator(op: string) {
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
      return;
    }

    this.input = this.input + op
    this.calcAnswer();
  }

  clear() {
    if (this.input != "") {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == "0") this.input = "";
  }

  PushResult() {
    if (this.input == '') {
      this.inputEmpty = true;
    }

    else {
      if (this.activeSaving != '') {
        this.history = {
          category: `savings (${this.activeSaving.name})`,
          sum: this.result,
          users_id: this.LogUser.id,
          create_at: new Date()
        }
        this.userService.createHistory(this.history).subscribe(() => {
          console.log('History create successfully!')
        }, (err) => {
          console.log(err);
        })

        this.updateSavings = {
          id: this.activeSaving.id,
          sum: this.activeSaving.sum + this.result
        };
        this.updateUser = {
          id: this.LogUser.id,
          income: this.users[this.activeSaving.users_id - 1].income + (-this.result)
        }
        this.userService.updateIncome(this.activeSaving.users_id, this.updateUser).subscribe(() => {
          console.log('User updated successfully!')
        }, (err) => {
          console.log(err);
        });
        this.userService.updateSavings(this.activeSaving.id, this.updateSavings).subscribe(() => {
          console.log('Saving updated successfully!')
        }, (err) => {
          console.log(err);
        })
        this.calculate = false;
        this.Reload();
      }
      else if (this.activeSpend != '') {

        this.history = {
          category: `spends (${this.activeSpend.name})`,
          sum: this.result,
          users_id: this.LogUser.id,
          create_at: new Date()
        }
        this.userService.createHistory(this.history).subscribe(() => {
          console.log('History create successfully!')
        }, (err) => {
          console.log(err);
        })
      }

      this.updateUser = {
        id: this.LogUser.id,
        balance: this.users[this.activeSpend.users_id - 1].balance + (-this.result)
      }
      this.userService.updateBalance(this.activeSpend.users_id, this.updateUser).subscribe(() => {
        console.log('User updated successfully!')
      }, (err) => {
        console.log(err);
      });
      this.updateExpenses = {
        id: this.LogUser.id,
        expenses: this.users[this.activeSpend.users_id - 1].expenses + this.result
      }
      this.userService.updateExpenses(this.activeSpend.users_id, this.updateExpenses).subscribe(() => {
        console.log('User updated successfully!')
      }, (err) => {
        console.log(err);
      });

      this.updateSavings = {
        id: this.activateSavSpen.id,
        sum: this.activateSavSpen.sum + (-this.result)
      };
      this.userService.updateSavings(this.activateSavSpen.id, this.updateSavings).subscribe(() => {
        console.log('Saving updated successfully!')
      }, (err) => {
        console.log(err);
      })
      this.updateSpends = {
        id: this.activeSpend.id,
        sum: this.activeSpend.sum + this.result
      };
      this.userService.updateSpends(this.activeSpend.id, this.updateSpends).subscribe(() => {
        console.log('Spends updated successfully!')
      }, (err) => {
        console.log(err);
      })
      this.calculate = false;
      this.Reload();
    }
  }


  Reload() {
    window.location.reload();
  }

}
