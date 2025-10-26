import { Component, OnInit, signal, effect } from '@angular/core';
import { Weather } from './services/weather';
import { Spinner } from './services/spinner';
import { Unit } from './services/unit';
import { Theme } from './services/theme';
import { Error } from './services/error';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'weather-dashboard';

  userIP = signal('');
  userLocation = signal('Your Location');
  allowLocation = signal(false);
  showPermission = signal(false);

  constructor(
    private weather: Weather,
    private unit: Unit,
    public theme: Theme,
    public spinner: Spinner,
    public error: Error
  ) {
    effect(() => {
      if (this.allowLocation()) {
        this.getUserLocation();
      }
    });
  }

  ngOnInit(): void {
    this.setUserPermission();
    this.unit.setUnit();
    this.theme.setTheme();
  }

  getUserLocation() {
    this.weather.getIP().subscribe((res: any) => {
      this.userIP.set(res.ip);
      this.weather.getLocation(res.ip).subscribe((res: any) => {
        this.userLocation.set(res[0].name);
        this.weather.searchLocation.set(res[0].region);
      });
    });
  }

  hidePermission(value: string) {
    this.showPermission.set(false);
    if (value === 'yes') {
      this.allowLocation.set(true);
    }
  }

  setUserPermission() {
    const permission = localStorage.getItem('permission');

    if (permission === 'no') {
      this.allowLocation.set(false);
    } else if (permission == 'yes') {
      this.allowLocation.set(true);
    } else {
      this.showPermission.set(true);
    }
  }
}
