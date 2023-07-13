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
  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.plantService.getPlants().subscribe((plants) => {
      this.plantsToDisplay = plants;
      console.log(this.plantsToDisplay);
      this.recupererCategories()
    });
  }

  recupererCategories():string[] {
    let tabCategorie: string[] = [];
    for (const plant of this.plantsToDisplay) {
      tabCategorie.push(plant.categorie);
    }
    console.log(tabCategorie);

    let tableauAvecIndices = tabCategorie.map((valeur, index) => {
      return { valeur: valeur, index: index };
    });
    console.log(tableauAvecIndices);

    let tableauSansDoublons = tableauAvecIndices.filter((objet, index) => {
      return (
        tableauAvecIndices.findIndex((item) => item.valeur === objet.valeur) ===
        index
      );
    });
    console.log(tableauSansDoublons);
    let tabCategorieUnique = tableauSansDoublons.map((objet) => objet.valeur);

    return tabCategorieUnique
  }
}



