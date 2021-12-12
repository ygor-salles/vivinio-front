import { UserService } from './../../services/user.service';
import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';
import jwt_decode from 'jwt-decode';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    hide = true;
    usuario = { email: '', password: '' }

    constructor(
        private router: Router,
        private appComponent: AppComponent,
        private userService: UserService,
        private headerService: HeaderService
    ) { }

    ngOnInit(): void {
    }

    fazerLogin() {
        let body = {
            email: this.usuario.email,
            password: this.usuario.password
        }
        this.userService.login(body).subscribe(obj => {
            this.decodeToken(obj.token)

            // this.headerService.headerData.username = user.name
            // localStorage.setItem('currentUser', JSON.stringify({name: user.name, id: user.id}));
            // this.appComponent.redirectFromLoginToHome()
        });
    }

    decodeToken(token: string) {
        if (token) {
            const decode = jwt_decode(token)
            console.log(decode)
        }
    }

    registrar() {
        this.router.navigate(['users/create'])
    }

}
