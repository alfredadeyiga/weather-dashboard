import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  searchLocation = signal('California');
  header = new HttpHeaders(environments.header);

  constructor(private http: HttpClient) {}

  getIP() {
    return this.http.get(`${environments.ipBaseUrl}`);
  }

  getLocation(query: string) {
    return this.http.get(`${environments.apiBaseUrl}/search.json?q=${query}`, {
      headers: this.header,
    });
  }

  getSearchLocation(query: string) {
    const headers = this.header.set('X-Search', 'true');
    return this.http.get(`${environments.apiBaseUrl}/search.json?q=${query}`, {
      headers,
    });
  }

  getTimeZone() {
    return this.http.get(
      `${environments.apiBaseUrl}/timezone.json?q=${this.searchLocation()}`,
      { headers: this.header }
    );
  }

  getCurrent() {
    return this.http.get(
      `${environments.apiBaseUrl}/current.json?q=${this.searchLocation()}`,
      { headers: this.header }
    );
  }

  getDaily() {
    return this.http.get(
      `${
        environments.apiBaseUrl
      }/forecast.json?q=${this.searchLocation()}&days=5`,
      { headers: this.header }
    );
  }
}
