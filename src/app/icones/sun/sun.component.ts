import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.css']
})
export class SunComponent {
  @Input() sunValue!: string;
}
