import { Component, output} from '@angular/core';

@Component({
  selector: 'app-permission',
  standalone: false,
  templateUrl: './permission.html',
  styleUrl: './permission.scss',
})
export class Permission {
  onClick = output<string>();

  setPermission(value: string) {
    localStorage.setItem('permission', value)
    this.onClick.emit(value)
  }
}
