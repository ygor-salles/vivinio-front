import { environment } from './../../environments/environment';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from './../models/users.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const { apiUrl } = environment;

interface Auth {
  name?: string 
  password?: string
  token?: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${apiUrl}/users`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    let message = 'Ocorreu um erro!'
    if (e.error.message) message = e.error.message
    this.showMessage(message, true)
    return EMPTY
  }

  read(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  
  login(body: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${apiUrl}/login`, body).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<User>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.id}`
    return this.http.put<User>(url, user).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: string): Observable<User> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<User>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
}