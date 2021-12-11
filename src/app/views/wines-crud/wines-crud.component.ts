import { HeaderService } from '../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-wines-crud',
    templateUrl: './wines-crud.component.html',
    styleUrls: ['./wines-crud.component.css']
})
export class WinesCrudComponent implements OnInit {

    constructor(
        private router: Router,
        private headerService: HeaderService
    ) {
        Object.assign(headerService.headerData, {
            title: 'Cadastro de Wines',
            icon: 'sports_esports',
            routeUrl: '/wines'
        })
    }

    ngOnInit(): void {
    }

    get user_id(): string {
        return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null
    }

    navigateToWineCreate() {
        this.router.navigate(['/wines/create'])
    }

}
