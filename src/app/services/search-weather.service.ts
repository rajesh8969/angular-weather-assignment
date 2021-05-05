import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICitiesInfo } from '../interfaces';

import { WeatherService } from './weather.service';

@Injectable({ providedIn: 'root' })

export class SearchWeatherService {
  constructor(private weatherService: WeatherService) {
  }

  stringMask = (inputValue: string): RegExp[] => [ ...inputValue ].map(() => /[a-zA-Z ]/g);

  clearListHandler(): void {
    this.weatherService.cities.length = 0;
    localStorage.removeItem('cities');
  }

  addCityHandler(): void {
    const weatherService: WeatherService = this.weatherService;
    const existedCity: boolean = weatherService.cities.some(({ name }: ICitiesInfo): boolean =>
      name.toLowerCase() === weatherService.inputValue.value.toLowerCase());

    weatherService.fetchWeathers();
    weatherService.inputValue = new FormControl('');
    weatherService.validationText = '';
  }
}
