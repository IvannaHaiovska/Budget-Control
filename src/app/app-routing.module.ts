import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './shared/service/authguard/auth.guard.service'; 
import { MyProfileComponent } from './components/my-profile/my-profile.component'; 
import { HistoryComponent } from './components/history/history.component';
import { StatisticComponent } from './components/statistic/statistic.component'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
  canActivate: [AuthGuardService] },
  { path: 'my-profile', component: MyProfileComponent,
  canActivate: [AuthGuardService] },
    { path: 'statistic', component: StatisticComponent,
  canActivate: [AuthGuardService] },
  { path: 'history', component: HistoryComponent,
  canActivate: [AuthGuardService] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
