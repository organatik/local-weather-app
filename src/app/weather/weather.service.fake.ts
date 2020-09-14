import { Observable, of } from 'rxjs';

import { ICurrentWeather } from '../interfaces';
import { IWeatherService } from './weather.service';

export const fakeWeather: ICurrentWeather = {
  city: 'Kyiv',
  country: 'UA',
  date: 1485789600,
  image: '',
  temperature: 280.3,
  description: 'light intensity drizzle',
};

export class WeatherServiceFake implements IWeatherService {
  public getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }
}
