import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css'],
})
export class PlantDetailsComponent implements OnInit {
  plant!: Plant;
  waterValue!: number;
  sunValue!: string;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    console.log(routeParam);
    const plantIdFromRoute = Number(routeParam.get('plantId'));
    console.log(plantIdFromRoute);

    console.log(PlantService);

    this.plantService.getPlantsById(plantIdFromRoute).subscribe((plant) => {
      this.plant = plant;
      console.log(this.plant);
      this.waterValue = this.plant.arrosage
      this.sunValue = this.plant.soleil;
    });
  }
};
  



