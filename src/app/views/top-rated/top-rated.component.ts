import { ReviewService } from './../../services/review.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Wine } from "src/app/models/wine.model";
import { WineService } from '../../services/wine.service';
import { HeaderService } from './../../components/template/header/header.service';

const { apiUrl } = environment;

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private wineService: WineService, 
    private headerService: HeaderService,
    private router: Router,
    private reviewService: ReviewService,
  ) { 
    Object.assign(headerService.headerData, {
      title: 'Top wines',
      icon: 'star_border',
      routeUrl: '/top'
    })
  }

  wine: Wine;
  showSpinner = false
  media: number;
  estrelasOn: number;
  estrelasOff: number;
  isLogged: boolean;

  comentario: string;
  nota: number;

  ngOnInit(): void {
    this.showSpinner = true
    const id = +this.route.snapshot.paramMap.get('id')
    this.isLogged = window.localStorage.getItem('token') ? true : false;
    
    this.wineService.readById(id).subscribe(wine => {
      this.wine = wine
      this.media = this.fazerMedia(wine);
      
      this.estrelasOn = +(this.media.toFixed(0))
      this.estrelasOff = 5 - this.estrelasOn    

      console.log(this.wine)
      
      this.showSpinner = false
    });
  }

  fazerMedia(wine: Wine): number {
    let soma = 0
    wine.reviews.forEach((item, index) => {
      soma += item.evaluation
    })
    return (soma/wine.reviews.length)
  }

  transformImageUrl(imageUrl?: string): string {
    return imageUrl.slice(0, 4) === 'http' ? imageUrl : `${apiUrl}/${imageUrl}`;
  }

  voltar(): void {
    this.router.navigate(['/wines'])
  }

  createReview() {
    console.log(this.comentario, this.nota)
    const review = { wine_id: this.wine.id, review: this.comentario, evaluation: this.nota }
    this.reviewService.create(review).subscribe(() => {
      this.reviewService.showMessage('Review cadastrado com sucesso')
      this.comentario = null
      this.nota = null
      this.ngOnInit()
    })
  }
}
