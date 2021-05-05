import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ICitiesInfo } from '../interfaces';

const API_KEY: string = '434aaa551c8218a43b2c291d6e2ca8bc';

@Injectable({ providedIn: 'root' })

export class WeatherService {
  inputValue: FormControl = new FormControl('');
  validationText: string = '';
  cities: ICitiesInfo[] = [];

  constructor(private http: HttpClient) { }

  fetchWeathers(): void {
    let url: string;
    let citiesList = ['amsterdam', 'rotterdam', 'london', 'paris', 'munich'];
    citiesList.forEach((city)=>{
      if (location.protocol === 'http:') {
        url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=9&APPID=${API_KEY}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=9&APPID=${API_KEY}`;
      }
      this.http.get(url).subscribe((data: any): void => {
        console.log(data)
        this.cities.push({
          id: Date.now(),
          isCelsius: true,
          name: data.city.name,
          tempCelsius: Math.round(data.list[0].main.temp),
          tempFahrenheit: Math.round((data.list[0].main.temp * 9 / 5) + 32),
          forecasts: data.list.map((city: any): any => ({
            forecastTempTime: city.dt_txt,
            forecastTempCelsius: Math.round(city.main.temp),
            forecastTempFahrenheit: Math.round((city.main.temp * 9 / 5) + 32),
          })),
        });
  
      }, e => this.validationText = e.statusText);
    })
    

    
  }
}
