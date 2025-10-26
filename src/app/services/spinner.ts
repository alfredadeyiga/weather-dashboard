import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Spinner {
  private activeRequests = 0;
  isLoading = signal(false);

  show() {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      setTimeout(() => {
        if (this.activeRequests > 0) this.isLoading.set(true);
      }, 50);
    }
  }

  hide() {
    this.activeRequests = Math.max(this.activeRequests - 1, 0);
    if (this.activeRequests === 0) {
      this.isLoading.set(false);
    }
  }
}
