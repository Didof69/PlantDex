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
  tabSoleil: string[] = [];

  plantsToDisplayFilter: Plant[] = [];
  saveFilterTab = {
    categorie:["a"],
    arrosage:[1],
    soleil: ["b"],
  };
  
  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.plantService.getPlants().subscribe((plants) => {
      this.plantsToDisplay = plants;
      this.plantsToDisplayFilter = [...this.plantsToDisplay];
      this.tabCategorie = [
        ...new Set(
          this.plantsToDisplay.map((tabCategories) => tabCategories.categorie)
        ),
      ];
      // console.log(this.tabCategorie);

      this.tabEau = [
        ...new Set(this.plantsToDisplay.map((tabEaux) => tabEaux.arrosage)),
      ];
      // console.log(this.tabEau);

      this.tabSoleil = [
        ...new Set(this.plantsToDisplay.map((tabSoleils) => tabSoleils.soleil)),
      ];
      // console.log(this.tabSoleil);

      this.tabEau.sort();
      this.tabCategorie.sort();

       this.saveFilterTab = {
         categorie: this.tabCategorie,
         arrosage: this.tabEau,
         soleil: this.tabSoleil,
      };
      
      console.log('dans oninit l\'objet saveTabFilter est ', this.saveFilterTab);
    });
  }

  onFiltreCategorie(filtreCategorie: string[]) {
    this.saveFilterTab.categorie = [...filtreCategorie];
    this.saveFilter(this.saveFilterTab);
  }

  onFiltreEau(filtreEau: number[]) {
    this.saveFilterTab.arrosage = [...filtreEau];
    this.saveFilter(this.saveFilterTab);
  }

  onFiltreSoleil(filtreSoleil: string[]) {
    this.saveFilterTab.soleil = [...filtreSoleil];
    this.saveFilter(this.saveFilterTab);
  }

  saveFilter(saveFilter: any) {
    console.log(
      "le saveTabFilter à l'entrée de saveFilter()",
      this.saveFilterTab
    );

    if (
      this.saveFilterTab.categorie.length >= 1 ||
      this.saveFilterTab.arrosage.length >= 1 ||
      this.saveFilterTab.soleil.length >= 1
    ) {
      console.log('categoryFiltre est utilisé', saveFilter[0]);
      this.plantsToDisplayFilter = this.plantsToDisplay
        .filter((e) => this.saveFilterTab.categorie.includes(e.categorie))
        .filter((e) => this.saveFilterTab.arrosage.includes(e.arrosage))
        .filter((e) => this.saveFilterTab.soleil.includes(e.soleil));
    }

    console.log(
      'le saveTabFilter à la sortie de saveFilter()',
      this.saveFilterTab
    );

    console.log('plantes affichées', this.plantsToDisplayFilter);
  }
}
