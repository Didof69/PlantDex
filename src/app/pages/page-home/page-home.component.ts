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
  saveFilterTab: ((number)[] | (string)[])[] = [[], [],[]];

  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.plantService.getPlants().subscribe((plants) => {
      console.log(plants);

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

      this.tabEau.sort();
      this.tabCategorie.sort();
      console.log('dans la method oninit', this.saveFilterTab);
      
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

    console.log('ceci est tabfilter', this.plantsToDisplayFilter);
    console.log('ceci est le filtre categorie', filtreCategorie);

    this.saveFilterTab[0] = [...filtreCategorie];
    console.log('saveTab : ', this.saveFilterTab);
    this.saveFilter(this.saveFilterTab);
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
    console.log('ceci est le filtre eau', filtreEau);

    this.saveFilterTab[1] = [...filtreEau];
    console.log('saveTab : ', this.saveFilterTab);
    this.saveFilter(this.saveFilterTab)
  }

  saveFilter(saveFilter: any) {
    if (
      (saveFilter[0].length === 0 && saveFilter[1].length === 0) ||
      (saveFilter[0].length === this.tabCategorie.length &&
        saveFilter[1].length === this.tabEau.length)
    ) {
      this.plantsToDisplayFilter = [...this.plantsToDisplay];
      console.log('tout s affiche');
      
    } else if (saveFilter[0].length >= 1 && saveFilter[1].length === 0) {
      console.log('je suis dans save filter category',saveFilter[0]);

      for (let i = 0; i < saveFilter[0].length; i++) {
        this.plantsToDisplayFilter = this.plantsToDisplay.filter((e) =>
          saveFilter[0].includes(e.categorie)
        );
      }
    } else if (saveFilter[0].length === 0 && saveFilter[1].length >= 1) {
      console.log('je suis dans save filter eau',saveFilter[1]);

      for (let i = 0; i < saveFilter[1].length; i++) {
        this.plantsToDisplayFilter = this.plantsToDisplay.filter((e) => saveFilter[1].includes(e.arrosage))
      }

    } else if (saveFilter[0].length >= 1 || saveFilter[1].length >= 1) {
      console.log('je suis les deux',saveFilter[0], saveFilter[1]);

      for (let i = 0; i < saveFilter[0].length; i++) {
        this.plantsToDisplayFilter = this.plantsToDisplay
          .filter((e) => saveFilter[0].includes(e.categorie))
          .filter((e) => saveFilter[1].includes(e.arrosage));
      }
    }
  }
  

}

