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
  saveFilterTab: (number[] | string[])[] = [[], [], []];

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

      this.saveFilterTab = [this.tabCategorie, this.tabEau, this.tabSoleil];
      console.log('dans oninit le saveTabFilter est ', this.saveFilterTab);
    });
  }

  onFiltreCategorie(filtreCategorie: string[]) {
    this.saveFilterTab[0] = [...filtreCategorie];
    this.saveFilter(this.saveFilterTab);
  }

  onFiltreEau(filtreEau: number[]) {
    this.saveFilterTab[1] = [...filtreEau];
    this.saveFilter(this.saveFilterTab);
  }

  onFiltreSoleil(filtreSoleil: string[]) {
    this.saveFilterTab[2] = [...filtreSoleil];
    this.saveFilter(this.saveFilterTab);
  }

  saveFilter(saveFilter: any) {
    console.log(
      "le saveTabFilter à l'entrée de saveFilter()",
      this.saveFilterTab
    );

    if (
      saveFilter[0].length >= 1 ||
      saveFilter[1].length >= 1 ||
      saveFilter[2].length >= 1
    ) {
      console.log('categoryFiltre est utilisé', saveFilter[0]);
      this.plantsToDisplayFilter = this.plantsToDisplay
        .filter((e) => saveFilter[0].includes(e.categorie))
        .filter((e) => saveFilter[1].includes(e.arrosage))
        .filter((e) => saveFilter[2].includes(e.soleil));
    }

    // if (saveFilter[1].length >= 1) {
    //   console.log('eauFiltre est utilisé', saveFilter[1]);
    //   this.plantsToDisplayFilter = this.plantsToDisplay
    //     .filter((e) => saveFilter[0].includes(e.categorie))
    //     .filter((e) => saveFilter[1].includes(e.arrosage))
    //     .filter((e) => saveFilter[2].includes(e.soleil));
    // }

    // if (saveFilter[2].length >= 1) {
    //   console.log('soleilFiltre est utilisé', saveFilter[2]);
    //   this.plantsToDisplayFilter = this.plantsToDisplay
    //     .filter((e) => saveFilter[0].includes(e.categorie))
    //     .filter((e) => saveFilter[1].includes(e.arrosage))
    //     .filter((e) => saveFilter[2].includes(e.soleil));
    // }

    // if (
    //   saveFilter[0].length === this.tabCategorie.length &&
    //   saveFilter[1].length === this.tabEau.length &&
    //   saveFilter[2].length === this.tabSoleil.length
    // ) {
    //   this.plantsToDisplayFilter = [...this.plantsToDisplay];
    //   console.log('tout s affiche');
    // }

    console.log(
      'le saveTabFilter à la sortie de saveFilter()',
      this.saveFilterTab
    );

    console.log('plantes affichées', this.plantsToDisplayFilter);
  }
}
