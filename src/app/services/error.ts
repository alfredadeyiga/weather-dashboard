import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Error {
  isError = signal(false)

  show(){
    this.isError.set(true)
  }
}
