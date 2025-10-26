import { Component, input, signal } from '@angular/core';
import { Unit } from '../../services/unit';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  searchQuery = signal('');
  hideSearch = signal(true);
  hideSidebar = signal(true);
  location = input('');

  constructor(public theme: Theme, public unit: Unit) {}

  toggleSearch() {
    this.hideSearch.update((value) => !value);
  }

  toggleSidebar() {
    this.hideSidebar.update((value) => !value);
  }

  changeLocation() {
    this.searchQuery.set('');
    this.hideSearch.set(true)
  }
}
