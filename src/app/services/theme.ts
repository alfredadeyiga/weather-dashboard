import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  isDarkMode = signal(false);

  setTheme() {
    const theme = localStorage.getItem('theme');

    if (!theme) {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else if (theme === 'light') {
      document.body.classList.add('light');
    } else (
      this.isDarkMode.set(true)
    )
  }

  changeTheme() {
    const theme = localStorage.getItem('theme');

    if (theme === 'light') {
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      this.isDarkMode.set(true);
    } else {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
      this.isDarkMode.set(false);
    }
  }
}
