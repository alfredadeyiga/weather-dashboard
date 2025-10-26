import {
  Component,
  ElementRef,
  HostListener,
  output,
  ViewChild,
} from '@angular/core';
import { Unit } from '../../../services/unit';
import { Theme } from '../../../services/theme';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  onClose = output();
  @ViewChild('overlayRef') overlayRef!: ElementRef;

  constructor(public unit: Unit, public theme: Theme) {}

  toggleSidebar() {
    this.onClose.emit();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      this.overlayRef &&
      this.overlayRef.nativeElement.contains(event.target)
    ) {
      this.toggleSidebar();
    }
  }
}
