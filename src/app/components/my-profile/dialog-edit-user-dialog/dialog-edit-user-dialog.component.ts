import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StorageService } from 'src/app/shared/service/storage/storage.service';

export interface DialogUpdateData {
  userDetail: string,
  updateItem: string;
}

@Component({
  selector: 'app-dialog-edit-user-dialog',
  templateUrl: './dialog-edit-user-dialog.component.html',
  styleUrls: ['./dialog-edit-user-dialog.component.css']
})
export class DialogEditUserDialogComponent implements OnInit {

  public log: any;
  public LogUser: any;
  public password = '';
  public password1 = '';
  public isPasswordOk = false;
  public passwordWrong = false;
  public strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#\$%\^&\])(?=.{8,})");
  public color = 'rgb(225, 22, 22)';
  constructor(public dialogRef: MatDialogRef<DialogEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogUpdateData,
    private storageService: StorageService,) { }

  ngOnInit(): void {
    this.GetLoginUser()
  }

  GetLoginUser() {
    this.log = this.storageService.getUser();
    this.LogUser = this.log.user;
  }
  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload();
  }

  CheckPassword() {
    if (this.LogUser.password === this.password) {
      this.isPasswordOk = true;
      this.passwordWrong = false;
    }
    else {
      this.passwordWrong = true;
    }
  }

}
