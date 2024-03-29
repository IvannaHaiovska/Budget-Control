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
public errorMessage = '';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(baseUrl);
  }
  getOne(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${baseUrl}/${id}`);
  }
  updateUser(id: number, data: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${baseUrl}/${id}`, data)
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
  createSavings(item:any):Observable<ISavings> {
    return this.http.post<ISavings>(`${baseUrl}/savings`, item, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
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
  createSpends(item:any):Observable<ISpends> {
    return this.http.post<ISpends>(`${baseUrl}/spends`, item, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  
  updateSpends(id: number, data: any): Observable<ISpends> {
    return this.http.put<ISpends>(`${baseUrl}/spends/${id}`, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/history`);
  }
  getHistoryByYear(year: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${year}`);
  }
  createHistory(item:any):Observable<any> {
    return this.http.post<any>(`${baseUrl}/history/${item.month}`, item, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  // Error 
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      this.errorMessage = error.error.message;
    } else {
      // Handle server error
      this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(this.errorMessage);
    return throwError(this.errorMessage);
  }

}
