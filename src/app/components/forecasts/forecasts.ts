import { Component, effect, input, signal } from '@angular/core';
import { dailyWeather, hourlyWeather } from '../../models/data';
import { Weather } from '../../services/weather';
import { Unit } from '../../services/unit';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-forecasts',
  standalone: false,
  templateUrl: './forecasts.html',
  styleUrl: './forecasts.scss',
})
export class Forecasts {
  location = input('');
  dailyWeather = signal<dailyWeather[]>([]);
  hourlyWeather = signal<hourlyWeather[]>([]);

  constructor(
    private weather: Weather,
    public unit: Unit,
    public theme: Theme
  ) {
    effect(() => {
      this.weather.searchLocation();
      this.getDailyWeather();
      this.getHourlyWeather();
    });
  }

  getDailyWeather() {
    this.weather.getDaily().subscribe((res: any) => {
      const daily = res.forecast.forecastday.map((day: any) => ({
        date: day.date,
        temp_c: day.day.avgtemp_c,
        temp_f: day.day.avgtemp_f,
        icon: day.day.condition.icon,
      }));

      this.dailyWeather.set(daily);
    });
  }

  getHourlyWeather() {
    this.weather.getDaily().subscribe((res: any) => {
      const locationTime = res.location.localtime;
      const now = new Date(locationTime);

      const allHours = [
        ...res.forecast.forecastday[0].hour,
        ...res.forecast.forecastday[1].hour,
      ];
      const hourly = allHours
        .filter((hour: any) => new Date(hour.time) > now)
        .map((hour: any) => ({
          time: hour.time,
          temp_c: hour.temp_c,
          temp_f: hour.temp_f,
          icon: hour.condition.icon,
          condition: hour.condition.text,
          wind_speed: hour.wind_kph,
          wind_direction: this.getWindRotation(hour.wind_dir),
        }))
        .slice(0, 5);

      this.hourlyWeather.set(hourly);
    });
  }

  getWindRotation(direction: string) {
    switch (direction) {
      case 'N':
        return 'rotate-0';
      case 'NE':
      case 'NNE':
      case 'ENE':
        return 'rotate-45 ml-1';
      case 'E':
        return 'rotate-90 ml-1';
      case 'ESE':
      case 'SE':
      case 'SSE':
        return 'rotate-[135deg] ml-1 mt-2';
      case 'S':
        return 'rotate-180 mt-2';
      case 'SW':
      case 'SSW':
      case 'WSW':
        return 'rotate-[225deg] mr-1 mt-2';
      case 'W':
        return 'rotate-[270deg] mr-1';
      case 'NW':
      case 'NNW':
      case 'WNW':
        return 'rotate-[315deg] mr-1';
      default:
        return 'rotate-0';
    }
  }
}
