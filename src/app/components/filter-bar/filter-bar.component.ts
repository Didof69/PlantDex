import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  @Input() tabCategorie!: Array<string>;
  @Input() tabEau!: Array<number>;
  @Output() newCaterogyEvent = new EventEmitter<string[]>();
  @Output() newEauEvent = new EventEmitter<number[]>();

  categorieFiltre: string[] = [];
  eauFiltre: number[] = [];

  ngOnInit(): void {}

  onCheckCategory(e: Event) {
    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.categorieFiltre.length === this.tabCategorie.length) {
        this.categorieFiltre = [];
        this.categorieFiltre.push(target.value);
      } else {
        this.categorieFiltre.push(target.value);
      }
      // console.log(this.categorieFiltre);
    } else {
      if (this.categorieFiltre.includes(target.value)) {
        this.categorieFiltre = this.categorieFiltre.filter(
          (e) => e != target.value
        );
      } else {
        this.categorieFiltre.push(target.value);
      }
      // console.log(this.categorieFiltre);
    }

    if (this.categorieFiltre.length === 0) {
      this.categorieFiltre = [...this.tabCategorie];
    }

    console.log('filtres utilisés', this.categorieFiltre);

    this.newCaterogyEvent.emit(this.categorieFiltre);
  }

  onCheckEau(e: Event) {
    console.log(e);
    // recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;
    console.log('valeur de la checkbox ' + target.value);
    console.log('cochée?' + target.checked);

    if (target.checked) {
      if (this.eauFiltre.length === this.tabEau.length) {
        this.eauFiltre = [];
        this.eauFiltre.push(parseInt(target.value));
        console.log(this.eauFiltre);
      } else {
        this.eauFiltre.push(parseInt(target.value));
        console.log(this.eauFiltre);
      }
    }

    if (!target.checked) {
      if (this.eauFiltre.includes(parseInt(target.value))) {
        this.eauFiltre = this.eauFiltre.filter(
          (e) => e != parseInt(target.value)
        );
      } else {
        this.eauFiltre.push(parseInt(target.value));
      }
      console.log(this.eauFiltre);
    }

    if (this.eauFiltre.length === 0) {
      this.eauFiltre = [...this.tabEau];
    }

    console.log('filtres utilisés', this.eauFiltre);

    this.newEauEvent.emit(this.eauFiltre);
  }
}
