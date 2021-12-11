import { HeaderService } from './../../template/header/header.service';
import { MatTableDataSource } from '@angular/material/table';
import { WineService } from './../../../services/wine.service';
import { Wine } from './../../../models/wine.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-wine-read',
    templateUrl: './wine-read.component.html',
    styleUrls: ['./wine-read.component.css']
})
export class WineReadComponent implements OnInit {

    wines: Wine[] = []
    displayedColumns = ['imgPath', 'title', 'summary', 'developer', 'type', 'genre', 'rating', 'action'];
    filters = [
        { type: 'filteredTitles', attribute: 'title', control: 'titlesControl' }, 
        { type: 'filteredDevelopers', attribute: 'developer', control: 'developersControl' },
        { type:'filteredGenres', attribute: 'genre', control: 'genresControl' }
    ]
    dataSource: any
    statusTable: boolean

    titlesControl = new FormControl();
    developersControl = new FormControl();
    genresControl = new FormControl();

    filteredDevelopers: any;
    filteredTitles: any;
    filteredGenres: any;
    newFilters = []

    constructor(private wineService: WineService, private headerService: HeaderService) { }

    ngOnInit(): void {
        if (this.username == null) this.displayedColumns.pop()
        this.wineService.read().subscribe(wines => {
            this.wines = wines
            console.log(this.wines)
            this.filters.map(filter => this._multiFilters(filter.type, filter.attribute, filter.control))
        })
        this.statusTable = true
    }

    displayTitles(wine: Wine): string {
        return wine && wine.country ? wine.country : '';
    }

    displayDevelopers(wine: Wine): string {
        return wine && wine.type ? wine.type : '';
    }
    
    displayGenres(wine: Wine): string {
        return wine && wine.type_grape ? wine.type_grape : '';
    }

    private _filter(name: any, attribute: string): Wine[] {
        const filterValue = name.toLowerCase();
        return this.newFilters.filter(option => option[attribute].toLowerCase().indexOf(filterValue) === 0);
    }

    private _prepareValuesToFilter(attribute: string): Wine[] {
        this.newFilters = this.wines.filter((item, index, self) => index === self.findIndex(i => (i[attribute] === item[attribute]) ) );
        return this.newFilters;
    }

    private _multiFilters(filterType: string, filterAttribute: string, filterControl:string) {
        this[filterType] = this[filterControl].valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value[filterAttribute]),
                map(name => name ? this._filter(name, filterAttribute) : this._prepareValuesToFilter(filterAttribute))
            );
    }

    applyFilter(filter: string) {
        console.log("filter");
        this.statusTable = false
        this.dataSource = new MatTableDataSource(this.wines)
        this.dataSource.filter = filter.trim().toLowerCase();
    }

    get username(): string {
        return this.headerService.headerData.username
    }

    get user_id(): string {
        return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null
    }

    openDialog(event: string) {
        this.wineService.openDialog(event)
    }
}
