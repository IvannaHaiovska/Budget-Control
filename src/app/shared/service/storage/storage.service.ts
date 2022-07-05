import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router) { }
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    if (this.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
  public logOut(): any {
    window.sessionStorage.removeItem(USER_KEY);
    this.router.navigate(['login']);
  }
}
