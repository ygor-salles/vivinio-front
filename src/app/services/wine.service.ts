import { DialogComponent } from './dialog/dialog.component';
import { Wine } from './../models/wine.model';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType  } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  baseUrl = 'http://localhost:3001/wines'

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private dialog: MatDialog) {}

  upload(formData) {
    return this.http.post<any>(`${this.baseUrl}/upload/`, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  openDialog(summaryCapture: string) {
    this.dialog.open(DialogComponent, {data: {summary: summaryCapture}})
  }

  create(wine: Wine): Observable<Wine> {
    return this.http.post<Wine>(this.baseUrl, wine).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Wine[]> {
    return this.http.get<Wine[]>(`${this.baseUrl}`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  wineByConsole(plataforma): Observable<Wine[]> {
    return this.http.get<Wine[]>(`${this.baseUrl}/most_rated/${plataforma}`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  //teste
  readById(id: string): Observable<Wine> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Wine>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(wine: Wine): Observable<Wine> {
    const url = `${this.baseUrl}/${wine.id}`;
    return this.http.put<Wine>(url, wine).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: string): Observable<Wine> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Wine>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    let message = 'Ocorreu um erro!'
    if (e.error.message) message = e.error.message
    this.showMessage(message, true)
    return EMPTY
  }
}
