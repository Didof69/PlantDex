import { Component } from '@angular/core';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css'],
})
export class HeartComponent {
  iconeCoeurVide = 'fi fi-rs-heart';
  iconeCoeurPlein = 'fi fi-ss-heart';
  iconeActuelle = this.iconeCoeurVide;

  onSurvole() {
    this.iconeActuelle = this.iconeCoeurPlein;
  }

  onQuitte() {
    this.iconeActuelle = this.iconeCoeurVide;
  }
}
