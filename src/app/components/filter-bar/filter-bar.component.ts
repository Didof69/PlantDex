import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  @Input() tabCategorie!: Array<string>;
  @Output() newItemEvent = new EventEmitter<string[]>()

  renvoiFiltre: string[] = [];
  categorieFiltre: string[] = [];

  onCheckCategory(e: Event) {
    console.log(e);
    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;
    // console.log('valeur de la checkbox ' + target.value);
    // console.log('cochée?' + target.checked);

    if (target.checked) {
      this.categorieFiltre.push(target.value);
      // console.log(this.categorieFiltre);
      this.renvoiFiltre = this.categorieFiltre
    }

    if (!target.checked) {
      if (this.categorieFiltre.includes(target.value)) {
        this.categorieFiltre = this.categorieFiltre.filter(
          (e) => e != target.value
        );
        this.renvoiFiltre = this.categorieFiltre;
      } else {
        this.categorieFiltre.push(target.value);
        this.renvoiFiltre = this.categorieFiltre;
      }
      // console.log(this.categorieFiltre);
    }

    if (this.categorieFiltre.length === 0) {
      this.renvoiFiltre = this.tabCategorie;
    }

    console.log("filtres utilisés", this.renvoiFiltre);
    
    this.newItemEvent.emit(this.renvoiFiltre);
  }
}
