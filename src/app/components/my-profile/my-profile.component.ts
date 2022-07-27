import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogPasswordDialog } from './dialog-password-dialog/dialog-password-dialog';
import { DialogEditUserDialogComponent } from './dialog-edit-user-dialog/dialog-edit-user-dialog.component';

import { UsersService } from 'src/app/shared/service/users/users.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public password!: string;
  public name!: string;
  public surname!: string;
  public email!: string;
  public balance!: number;
  public log: any;
  public LogUser: any;
  public isAvatar = false;
  public isChoose = false;
  public avatar = [
    { imagePath: 'https://i2-prod.leicestermercury.co.uk/incoming/article7070362.ece/ALTERNATES/s1200c/1_EGR090522profile_03.jpg' },
    { imagePath: 'https://pbs.twimg.com/media/FSn8ADnWIAE_it4?format=jpg&name=360x360' },
    { imagePath: 'https://img.buzzfeed.com/buzzfeed-static/static/2022-05/11/14/asset/82ea240a9e12/sub-buzz-2936-1652280422-21.jpg?downsize=900:*&output-format=auto&output-quality=auto' },
    { imagePath: 'https://pbs.twimg.com/media/FSbY-_YaMAAbks1?format=jpg&name=900x900' }
  ];

  public updatePassword: any;
  public updateUser: any;
  public updateItem: any;
  public userDetail: any;

  constructor(
    private storageService: StorageService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.GetLoginUser()
  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }

  Back() {
    this.router.navigate(['home']);
  }
  ChooseAvatar() {
    this.isAvatar = true;
    this.isChoose = true;
  }
  close() {
    this.isAvatar = false;
    this.isChoose = false;
  }
  ChoosePhoto(index: number) {
    this.LogUser.imagePath = this.avatar[index].imagePath
    this.isAvatar = false;
    this.isChoose = false;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPasswordDialog, {
      width: '250px',
      data: { password: this.password },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.LogUser.password = result;
      this.updatePassword = {
        id: this.LogUser.id,
        password: result
      }
      this.password = result;
    });
  }

  Update(item: any) {
    this.updateItem = item;

    const dialogRef = this.dialog.open(DialogEditUserDialogComponent, {
      width: '250px',
      data: { userDetail: this.userDetail, updateItem: this.updateItem },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (item === 'name') {
        this.LogUser.username = result;
        this.name = result;
      }
      else if (item === 'surname') {
        this.LogUser.usersurname = result;
        this.surname = result;
      }
      else if (item === 'email') {
        this.LogUser.email = result;
        this.email = result;
      }

      else if (item === 'balance') {
        this.LogUser.balance = result;
        this.balance = result;
      }
    });
  }
  Save() {
    this.updateUser = {
      id: this.LogUser.id,
      username: this.LogUser.username,
      usersurname: this.LogUser.usersurname,
      email: this.LogUser.email,
      password: this.LogUser.password,
      balance: this.LogUser.balance
    }
    this.userService.updateUser(this.LogUser.id, this.updateUser).subscribe(() => {
      console.log('User updated successfully!')
    }, (err) => {
      console.log(err);
    });
    this.log.user = this.LogUser
    this.storageService.UpdateUser(this.log);
  }

  Cancel() {
    this.GetLoginUser();
  }

}
