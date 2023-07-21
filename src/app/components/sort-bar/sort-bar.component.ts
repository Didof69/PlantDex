import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.css']
})
export class SortBarComponent {
  @Output() newSortEvent = new EventEmitter<string>();

  onSortBar(value:string) {
    this.newSortEvent.emit(value);
  };
}
