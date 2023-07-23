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
    categorie: ['a'],
    arrosage: [1],
    soleil: ['b'],
    valeur: 'c',
  };

  compteurCategorie: number = 0;
  compteurEau: number = 0;
  compteurSoleil: number = 0;
  compteurValue!: string;

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
        valeur: '',
      };

      console.log("dans oninit l'objet saveTabFilter est ", this.saveFilterTab);
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

  onSearchValue(value: string) {
    this.saveFilterTab.valeur = value;
    this.saveFilter(this.saveFilterTab);
  }

  onSortValue(e: Event) {
    const target = e.target as HTMLInputElement;
    this.compteurSort(e);
    // console.log(this.compteurCategorie, this.compteurEau, this.compteurSoleil);

    if (
      this.compteurCategorie === 0 &&
      this.compteurEau === 0 &&
      this.compteurSoleil === 0
    ) { this.saveFilter(this.saveFilterTab) }

    if (
      this.compteurCategorie === 1 ||
      this.compteurEau === 1 ||
      this.compteurSoleil === 1
    ) {
      this.plantsToDisplayFilter.sort((plantA, plantB) => {
        if (target.value == 'alpha') {
          if (plantA.nom < plantB.nom) { return -1; }
          if (plantA.nom > plantB.nom) { return 1; }
          return 0;
        }

        if (target.value == 'eau') {
          if (plantA.arrosage < plantB.arrosage) { return -1; }
          if (plantA.arrosage > plantB.arrosage) { return 1; }
          return 0;
        }

        if (target.value == 'soleil') {
          if (plantA.soleil.length < plantB.soleil.length) { return -1; }
          if (plantA.soleil.length > plantB.soleil.length) { return 1; }
          return 0;
        }

        return 0;
      });
    }

    if (
      this.compteurCategorie === 2 ||
      this.compteurEau === 2 ||
      this.compteurSoleil === 2
    ) {
      this.plantsToDisplayFilter.sort((plantA, plantB) => {
        if (target.value == 'alpha') {
          if (plantA.nom > plantB.nom) { return -1; }
          if (plantA.nom < plantB.nom) { return 1; }
          return 0;
        }

        if (target.value == 'eau') {
          if (plantA.arrosage > plantB.arrosage) { return -1; }
          if (plantA.arrosage < plantB.arrosage) { return 1; }
          return 0;
        }

        if (target.value == 'soleil') {
          if (plantA.soleil.length > plantB.soleil.length) { return -1; }
          if (plantA.soleil.length < plantB.soleil.length) { return 1; }
          return 0;
        }

        return 0;
      });
    }
  }

  compteurSort(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.value == 'alpha') {
      // console.log('a', this.compteurCategorie);
      this.compteurCategorie += 1;
      this.compteurValue = `alpha${this.compteurCategorie}`;

      if (this.compteurCategorie <= 2) {
        this.compteurEau = 0;
        this.compteurSoleil = 0;
      } else {
        this.compteurCategorie = 0;
        this.compteurValue = ''
      }
      // console.log('a', this.compteurCategorie);
    }

    if (target.value == 'eau') {
      this.compteurEau += 1;
      this.compteurValue = `eau${this.compteurEau}`;

      if (this.compteurEau <= 2) {
        this.compteurCategorie = 0;
        this.compteurSoleil = 0;
      } else {
        this.compteurEau = 0;
        this.compteurValue = '';
      }
    }

    if (target.value == 'soleil') {
      this.compteurSoleil += 1;
      this.compteurValue = `soleil${this.compteurSoleil}`;

      if (this.compteurSoleil <= 2) {
        this.compteurEau = 0;
        this.compteurCategorie = 0;
      } else {
        this.compteurSoleil = 0;
        this.compteurValue = '';
      }
    }

    // console.log(this.compteurCategorie, this.compteurEau, this.compteurSoleil);
  }

  //  rechercher le bon typage
  saveFilter(saveFilter: any) {
    // console.log("le saveTabFilter à l'entrée de saveFilter()",this.saveFilterTab);

    if (
      this.saveFilterTab.categorie.length >= 1 ||
      this.saveFilterTab.arrosage.length >= 1 ||
      this.saveFilterTab.soleil.length >= 1 ||
      this.saveFilterTab.valeur.length >= 1
    ) {
      this.plantsToDisplayFilter = this.plantsToDisplay
        .filter((e) => this.saveFilterTab.categorie.includes(e.categorie))
        .filter((e) => this.saveFilterTab.arrosage.includes(e.arrosage))
        .filter((e) => this.saveFilterTab.soleil.includes(e.soleil))
        .filter((e) =>
          e.nom
            .toLocaleLowerCase()
            .includes(this.saveFilterTab.valeur.toLocaleLowerCase())
        );
    }

    // console.log('le saveTabFilter à la sortie de saveFilter()',this.saveFilterTab);

    // console.log('plantes affichées', this.plantsToDisplayFilter);
  }
}
