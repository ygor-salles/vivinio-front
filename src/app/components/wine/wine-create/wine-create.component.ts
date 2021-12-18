import { Router } from '@angular/router';
import { WineService } from './../../../services/wine.service';
import { Wine } from './../../../models/wine.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-wine-create',
    templateUrl: './wine-create.component.html',
    styleUrls: ['./wine-create.component.css']
})
export class WineCreateComponent implements OnInit {

    wine: Wine = {
        name: '',
        producer: '',
        country: '',
        type: '',
        type_grape: '',
        harmonizing: '',
        image: null,
        user_id: null,
    }

    imgBase64Path: string

    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

    constructor(
        private wineService: WineService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    uploadFileEvt(imgFile: any) {
        if (imgFile.target.files && imgFile.target.files[0]) {
            
            this.wine.image = imgFile.target.files[0];
            // HTML5 FileReader API
            let reader = new FileReader();
            reader.onload = (e: any) => {
                let image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    this.imgBase64Path = e.target.result;
                };
            };
            console.log(imgFile.target);
            reader.readAsDataURL(imgFile.target.files[0]);
        }
    }

    createWine() {
        this.wine.user_id = JSON.parse(localStorage.getItem('currentUser')).id
        this.wineService.create(this.wine).subscribe(() => {
            this.wineService.showMessage('Vinho cadastrado com sucesso')
            this.router.navigate(['/wines'])
        })
    }

    cancel() {
        this.router.navigate(['/wines'])
    }

    validaForm(): boolean {
        if (!this.wine.name 
            || !this.wine.producer 
            || !this.wine.country 
            || !this.wine.type
            || !this.wine.type_grape
            || !this.wine.harmonizing
            || !this.wine.image) {
                return false
            }
        return true
    }

}
