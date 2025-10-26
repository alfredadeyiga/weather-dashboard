import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Unit {
  unit = signal('celsius');

  setUnit() {
    const unit = localStorage.getItem('unit');

    if (!unit) {
      localStorage.setItem('unit', 'celsius');
    } else if (unit === 'fahrenheit') {
      this.unit.set('fahrenheit');
    }
  }

  changeUnit() {
    const unit = localStorage.getItem('unit');

    if (unit === 'celsius') {
      localStorage.setItem('unit', 'fahrenheit');
      this.unit.set('fahrenheit');
    } else {
      localStorage.setItem('unit', 'celsius');
      this.unit.set('celsius');
    }
  }
}
