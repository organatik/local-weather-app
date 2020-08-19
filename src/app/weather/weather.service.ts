import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICurrentWeather } from '../interfaces';
import { map } from 'rxjs/operators';

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  static convertKelvinToCelsius(kelvin: number) {
    return kelvin - 273.15;
  }

  static transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: WeatherService.convertKelvinToCelsius(data.main.temp),
      description: data.weather[0].description,
    };
  }

  gerCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('q', `${city}, ${country}`)
      .set('appid', environment.appId);

    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => WeatherService.transformToICurrentWeather(data)));
  }
}
