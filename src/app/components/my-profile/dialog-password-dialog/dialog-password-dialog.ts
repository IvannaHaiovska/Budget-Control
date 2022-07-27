import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StorageService } from 'src/app/shared/service/storage/storage.service';

export interface DialogData {
    password: string;
}
@Component({
    selector: 'dialog-password-dialog',
    templateUrl: 'dialog-password-dialog.html',
})
export class DialogPasswordDialog {

    public log: any;
    public LogUser: any;
    public password = '';
    public password1 = '';
    public isPasswordOk = false;
    public passwordWrong = false;
    public strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#\$%\^&\])(?=.{8,})");
    public newPasswordValid = false;
    public passwordInvalid = false;
    public confirmPassword = false;
    public color = 'rgb(225, 22, 22)';

    constructor(
        public dialogRef: MatDialogRef<DialogPasswordDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private storageService: StorageService,
    ) { }

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

    CheckNewPassword() {
        if (this.password1 === this.data.password) {
            this.confirmPassword = false;
            if (this.strongRegex.test(this.data.password)) {
                this.newPasswordValid = true;
                this.passwordInvalid = false;
            }
            else {
                this.newPasswordValid = false;
                this.passwordInvalid = true;
            }
        }
        else {
            this.confirmPassword = true;
        }
    }

}