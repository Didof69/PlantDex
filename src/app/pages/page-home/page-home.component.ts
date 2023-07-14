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
  plantsToDisplayFilter: Plant[] = [];

  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.plantService.getPlants().subscribe((plants) => {
      this.plantsToDisplay = plants;
      // console.log(this.plantsToDisplay);
      this.plantsToDisplayFilter = this.plantsToDisplay;

      this.tabCategorie = [
        ...new Set(
          this.plantsToDisplay.map((tabCategories) => tabCategories.categorie)
        ),
      ];
      // console.log(this.tabCategorie);
    });
  }

  // onFiltreCategorie(filtreCategorie: string[]) {
  //   this.plantsToDisplayFilter = this.plantsToDisplayFilter.filter((e) =>
  //     e.categorie.includes(e.categorie)
  //   );
  //   console.log(
  //     'ceci est tabfliter',
  //     this.plantsToDisplayFilter.filter((e) =>
  //       e.categorie.includes('plantes fleuries')
  //     )
  //   );
  //   console.log('ceci est le filtre', filtreCategorie);
  // }

  onFiltreCategorie(filtreCategorie: string[]) {   
      if (this.tabCategorie.length === filtreCategorie.length) {
        this.plantsToDisplayFilter = this.plantsToDisplay;
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
}
