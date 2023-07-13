import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from 'src/app/models/plant';
import { take } from 'rxjs';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit {
  plantsToDisplay: Plant[] = [];
  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.plantService.getPlants().subscribe((plants) => {
      this.plantsToDisplay = plants;
      // console.log(this.plantsToDisplay);
      this.recupererCategories();
    });
  }

  recupererCategories():string[] {
    let tabCategorie = [
      ...new Set(this.plantsToDisplay.map((tabCat) => tabCat.categorie)),
    ];
    console.log(tabCategorie);
    return tabCategorie
  }
}