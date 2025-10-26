import { Component, input, output, signal } from '@angular/core';
import { Weather } from '../../../services/weather';
import { searchResults } from '../../../models/data';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResults {
  query = input('');
  results = signal<searchResults[]>([]);
  isLoading = signal(false);
  isError = signal(false);
  onClick = output();

  constructor(private weather: Weather) {
    toObservable(this.query)
      .pipe(
        tap(() => {
          this.isError.set(false)
          this.isLoading.set(true);
          this.results.set([]);
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        const q = query.trim();
        if (q) {
          this.getResults(q);
        }
      });
  }

  getResults(query: string) {
    this.weather.getSearchLocation(query).subscribe((res: any) => {
      if (res.length !== 0) {
        const results = res.map((result: any) => ({
          name: result.name,
          region: result.region,
          country: result.country,
        }));
        this.results.set(results);
        this.isLoading.set(false);
      } else {
        this.results.set([])
        this.isLoading.set(false);
        this.isError.set(true);
      }
    });
  }

  setLocation(region: string) {
    this.weather.searchLocation.set(region);
    this.onClick.emit();
  }
}
