import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  @Input() tabCategorie!: Array<string>;  

  onCheckCategory(e:Event) {
    console.log(e);

    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;
    console.log("valeur de la checkbox " + target.value);
    console.log('cochée?' + target.checked);
    
  }
}
