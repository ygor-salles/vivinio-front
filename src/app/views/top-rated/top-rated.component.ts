import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { WineService } from '../../services/wine.service';
import { ActivatedRoute } from "@angular/router";
import { Wine } from "src/app/models/wine.model";

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {
  options: any;
  firstWine: Wine 
  secondWine: Wine 
  thirdWine: Wine 
  plataforma: any
  
  constructor(private route: ActivatedRoute,private wineService: WineService, private headerService: HeaderService) { 
    Object.assign(headerService.headerData, {
      title: 'Top wines',
      icon: 'star_border',
      routeUrl: '/top'
    })
  }

  ngOnInit(): void {
    this.plataforma = this.route.snapshot.paramMap.get('plataforma')
    this.wineService.wineByConsole(this.plataforma).subscribe(wines => {
      
      this.firstWine = wines[0] || null
      this.secondWine = wines[1]  || null
      this.thirdWine = wines[2] || null
    })
  }

}
