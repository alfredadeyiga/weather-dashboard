import { Component, effect, signal } from '@angular/core';
import { astro, currentWeather, dateTime } from '../../models/data';
import { Weather } from '../../services/weather';
import { Unit } from '../../services/unit';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  dateTime = signal<dateTime | null>(null);
  currentWeather = signal<currentWeather | null>(null);
  astro = signal<astro | null>(null);

  private timeInterval: any = null;

  constructor(private weather: Weather, public unit: Unit) {
    effect(() => {
      this.weather.searchLocation();
      this.getDateTime();
      this.getAstro();
      this.getCurrentWeather();
    });
  }

  getDateTime() {
    this.weather.getTimeZone().subscribe((res: any) => {
      this.formatDateTime(res.location.region, res.location.tz_id);

      if (this.timeInterval) {
        clearInterval(this.timeInterval);
      }

      this.timeInterval = setInterval(() => {
        this.formatDateTime(res.location.region, res.location.tz_id);
      }, 1000);
    });
  }

  formatDateTime(location: string, timeZone: string) {
    const now = new Date();

    const time = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
    });

    const date = now
      .toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        timeZone,
      })
      .replace(/(\w+)\s/, '$1, ');

    this.dateTime.set({
      location,
      date,
      time,
    });
  }

  getAstro() {
    this.weather.getDaily().subscribe((res: any) => {
      this.astro.set({
        sunrise: res.forecast.forecastday[0].astro.sunrise,
        sunset: res.forecast.forecastday[0].astro.sunset,
      });
    });
  }

  getCurrentWeather() {
    this.weather.getCurrent().subscribe((res: any) => {
      this.currentWeather.set({
        temp_c: res.current.temp_c,
        temp_f: res.current.temp_f,
        feelslike_c: res.current.feelslike_c,
        feelslike_f: res.current.feelslike_f,
        condition: res.current.condition.text,
        icon: res.current.condition.icon,
        wind: res.current.wind_kph,
        humidity: res.current.humidity,
        pressure: res.current.pressure_mb,
        uv: res.current.uv,
      });
    });
  }
}
