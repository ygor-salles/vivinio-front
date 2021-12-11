import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Wine } from 'src/app/models/wine.model';
import { WineService } from 'src/app/services/wine.service';

@Component({
    selector: 'app-wine-update',
    templateUrl: './wine-update.component.html',
    styleUrls: ['./wine-update.component.css']
})
export class WineUpdateComponent implements OnInit {
    wine: Wine = {} as Wine;
    genres = ['Ação', 'Aventura', 'Estratégia', 'RPG', 'Esporte', 'Simulação']
    imgBase64Path: string

    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

    constructor(
        private wineService: WineService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get("id");
        this.wineService.readById(id).subscribe((wine) => {
            this.wine = wine;
        });
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

    updateWine(): void {
        this.wineService.update(this.wine).subscribe(() => {
            this.wineService.showMessage("Vinho atualizado com sucesso!");
            this.router.navigate(["/wines"]);
        });
    }

    cancel(): void {
        this.router.navigate(["/wines"]);
    }
}
