import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  @Input() tabCategorie!: Array<string>;
  @Output() newCaterogyEvent = new EventEmitter<string[]>();

  categorieFiltre: string[] = [];

  onCheckCategory(e: Event) {
    // console.log(e);
    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;
    // console.log('valeur de la checkbox ' + target.value);
    // console.log('cochée?' + target.checked);

    if (target.checked) {
      this.categorieFiltre.push(target.value);
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
}
