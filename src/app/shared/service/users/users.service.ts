import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from '../../interface/user/user';
import { ISavings } from 'src/app/shared/interface/savings/savings';
import { ISpends } from 'src/app/shared/interface/spends/spends';

const baseUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  public users: Array<IUser> = [];

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(baseUrl);
  }
  getOne(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${baseUrl}/${id}`);
  }
  updateIncome(id: number, data: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${baseUrl}/income/${id}`, data);
  }
  updateBalance(id: number, data: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${baseUrl}/balance/${id}`, data);
  }
  updateExpenses(id: number, data: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${baseUrl}/expenses/${id}`, data);
  }

  getAllSavings(): Observable<ISavings[]> {
    return this.http.get<ISavings[]>(`${baseUrl}/savings`);
  }

  updateSavings(id: number, data: any): Observable<ISavings> {
    return this.http.put<ISavings>(`${baseUrl}/savings/${id}`, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  getAllSpends(): Observable<ISpends[]> {
    return this.http.get<ISpends[]>(`${baseUrl}/spends`);
  }

  updateSpends(id: number, data: any): Observable<ISpends> {
    return this.http.put<ISpends>(`${baseUrl}/spends/${id}`, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
