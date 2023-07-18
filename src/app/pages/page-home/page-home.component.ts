import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from 'src/app/models/plant';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit {
  plantsToDisplay: Plant[] = [];
  tabCategorie: string[] = [];
  tabEau: number[] = [];
  plantsToDisplayFilter: Plant[] = [];

  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.plantService.getPlants().subscribe((plants) => {
      this.plantsToDisplay = plants;
      // console.log(this.plantsToDisplay);
      this.plantsToDisplayFilter = [...this.plantsToDisplay];

      this.tabCategorie = [
        ...new Set(
          this.plantsToDisplay.map((tabCategories) => tabCategories.categorie)
        ),
      ];
      // console.log(this.tabCategorie);

      this.tabEau = [
        ...new Set(this.plantsToDisplay.map((tabEaus) => tabEaus.arrosage)),
      ];
      // console.log(this.tabEau);
    });
  }

  onFiltreCategorie(filtreCategorie: string[]) {
    if (this.tabCategorie.length === filtreCategorie.length) {
      this.plantsToDisplayFilter = [...this.plantsToDisplay];
    } else {
      for (let i = 0; i < filtreCategorie.length; i++) {
        this.plantsToDisplayFilter = this.plantsToDisplay.filter((e) =>
          filtreCategorie.includes(e.categorie)
        );
      }
    }

    console.log('ceci est tabfliter', this.plantsToDisplayFilter);
    console.log('ceci est le filtre', filtreCategorie);
  }

  onFiltreEau(filtreEau: number[]) {
    if (this.tabEau.length === filtreEau.length) {
      this.plantsToDisplayFilter = [...this.plantsToDisplay];
    } else {
      for (let i = 0; i < filtreEau.length; i++) {
        this.plantsToDisplayFilter = this.plantsToDisplay.filter((e) =>
          filtreEau.includes(e.arrosage)
        );
      }
    }

    console.log('ceci est tabfliter', this.plantsToDisplayFilter);
    console.log('ceci est le filtre', filtreEau);
  }
}
