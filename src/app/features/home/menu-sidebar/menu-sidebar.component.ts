import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CircleX, Cog, LucideAngularModule, LucideIconData} from 'lucide-angular';

@Component({
  selector: 'app-menu-sidebar',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.css'
})
export class MenuSidebarComponent {

  protected readonly circleX: LucideIconData = CircleX;
  protected readonly cogIcon = Cog;


  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  closeSidebar(): void {
    this.closed.emit();
  }


}
