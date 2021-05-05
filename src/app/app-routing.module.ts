import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherComponent } from './components/weather/weather.component';
import { ForecastWeatherComponent } from './components/forecast-weather/forecast-weather.component';

const routes: Routes = [
  { path: 'home', component: WeatherComponent },
  { path: 'forecast-weather/:name', component: ForecastWeatherComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule { }
