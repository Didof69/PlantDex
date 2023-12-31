import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageMyPlantsComponent } from './pages/page-my-plants/page-my-plants.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { CardComponent } from './components/card/card.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { HeartComponent } from './icones/heart/heart.component';
import { WaterComponent } from './icones/water/water.component';
import { SunComponent } from './icones/sun/sun.component';
import { PlantDetailsComponent } from './components/plant-details/plant-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageHomeComponent,
    PageMyPlantsComponent,
    PageAdminComponent,
    PageNotFoundComponent,
    PlantListComponent,
    CardComponent,
    FilterBarComponent,
    SearchBarComponent,
    SortBarComponent,
    HeartComponent,
    WaterComponent,
    SunComponent,
    PlantDetailsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
