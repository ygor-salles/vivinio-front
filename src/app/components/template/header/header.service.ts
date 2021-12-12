import { TokenDecode } from './../../../models/tokenDecode.model';
import { HeaderData } from './header-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

interface IUserDecode {
    id: number
    name: string
}

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    private _headerData = new BehaviorSubject<HeaderData>({
        title: 'Sistema colaborativo de Vinhos',
        icon: '',
        routeUrl: '',
        username: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).name : null
    })

    private loggedSubject = new Subject<boolean>()
    private tokenExp: number
    private idUser: number
    private username: string
    private logged$ = this.loggedSubject.asObservable();

    constructor() { 
        this.loggedSubject.next(this.isLogged());
        this.decodeToken(this.getToken())
    }

    getTitle() {
        return 'Sistema de vinhos'
    }

    setToken(token: string): IUserDecode {
        window.localStorage.setItem('token', token);
        this.decodeToken(token);
        this.loggedSubject.next(true);
        return { id: this.idUser, name: this.username };
    }

    isLogged(): boolean {
        return !!this.getToken()
    }

    isLoggedAsObservable(): Observable<boolean> {
        return this.logged$;
    }

    getToken(): any {
        return window.localStorage.getItem('token');
    }

    getRefreshToken(): any {
        return window.localStorage.getItem('refresh_token');
    }

    private decodeToken(token: string): TokenDecode | null {
        if (token) {
          const decode = jwt_decode<TokenDecode>(token);
          this.tokenExp = decode.exp;
    
          if (this.checkTokenValidity()) {
            this.idUser = decode.sub;
            this.username = decode.name;
            return decode;
          }
        }
        return null;
    }

    checkTokenValidity(): boolean {
        const current_time = Date.now().valueOf() / 1000;
        if (current_time > this.tokenExp) {
          return false;
        }
        return true;
    }

    get headerData(): HeaderData {
        return this._headerData.value
    }

    set headerData(headerData: HeaderData) {
        this._headerData.next(headerData)
    }

    setRefreshToken(refresh_token: string): void {
        window.localStorage.setItem('refresh_token', refresh_token);
      }

    atualizarToken(): Promise<string> {
        return new Promise((resolve, reject) => {
          const refreshToken = this.getRefreshToken();
    
          const decode = jwt_decode<TokenDecode>(refreshToken);
    
          const current_time = Date.now().valueOf() / 1000;
          if (current_time > decode.exp) {
            reject();
          }
    
        //   this.autenticacaoService.atualizarAutenticacao(refreshToken).subscribe(
        //     ({ token, refresh_token }) => {
        //       this.setToken(token);
        //       this.setRefreshToken(refresh_token);
        //       resolve(token);
        //     },
        //     err => reject(err),
        //   );
        });
      }
    
      logout(): void {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('currentUser');
        this.headerData.username = null
        // window.localStorage.removeItem('refresh_token');
        this.idUser = null;
        this.username = null;
        this.loggedSubject.next(false);
      }
}