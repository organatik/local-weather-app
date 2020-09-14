import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { WeatherService } from '../weather/weather.service';
import { fakeWeather } from '../weather/weather.service.fake';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async(() => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ]);

    TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents();
    weatherServiceMock = TestBed.inject(WeatherService) as any;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Arrange (подготавливать )
    weatherServiceMock.getCurrentWeather.and.returnValue(of());
    // Act (выполнить)
    fixture.detectChanges(); // triggers ngOnInit
    // Assert (утверждение, проверка теста)
    expect(component).toBeTruthy();
  });

  it('should get currentWeather from weatherService', () => {
    // Arrange (подготавливать )
    weatherServiceMock.getCurrentWeather.and.returnValue(of());
    // Act (выполнить)
    fixture.detectChanges(); // triggers ngOnInit
    // Assert (утверждение, проверка теста)
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  });

  it('should eagerly load currentWeather', () => {
    // Arrange (подготавливать )
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));
    // Act (выполнить)
    fixture.detectChanges(); // triggers ngOnInit
    // Assert (утверждение, проверка теста)
    expect(component.current).toBeDefined();
    expect(component.current.city).toEqual('Kyiv');
    // Assert on DOM
    const debugEl = fixture.debugElement;
    const titleEl: HTMLElement = debugEl.query(By.css('span')).nativeElement;
    expect(titleEl.textContent).toContain('Kyiv');
  });
});
