import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
  
export class PlantService {

  constructor(private http: HttpClient) { }

  getPlants(): Observable<Plant[]>{
    return this.http.get<Plant[]>('http://localhost:3000/plants')
  }
}
