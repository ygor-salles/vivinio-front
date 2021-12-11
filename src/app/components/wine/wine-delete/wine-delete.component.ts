import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Wine } from 'src/app/models/wine.model';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-wine-delete',
  templateUrl: './wine-delete.component.html',
  styleUrls: ['./wine-delete.component.css']
})
export class WineDeleteComponent implements OnInit {
  wine: Wine = {} as Wine;

  constructor(
    private wineService: WineService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.wineService.readById(id).subscribe((wine) => {
      this.wine = wine;
    });
  }

  deleteWine(): void {
    this.wineService.delete(this.wine.id).subscribe(() => {
      this.wineService.showMessage("Vinho excluido com sucesso!");
      this.router.navigate(["/wines"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/wines"]);
  }
}
