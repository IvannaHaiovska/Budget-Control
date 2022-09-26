import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material/material.module.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component'; 
import { LoginComponent } from './components/login/login.component';
import { HistoryComponent } from './components/history/history.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { DialogPasswordDialog } from './components/my-profile/dialog-password-dialog/dialog-password-dialog';
import { DialogEditUserDialogComponent } from './components/my-profile/dialog-edit-user-dialog/dialog-edit-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    HistoryComponent,
    StatisticComponent,
    MyProfileComponent,
    DialogPasswordDialog,
    DialogEditUserDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
