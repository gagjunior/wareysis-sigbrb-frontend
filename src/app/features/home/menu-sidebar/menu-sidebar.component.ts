import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {CircleX, Cog, ListPlus, LucideAngularModule, LucideIconData} from 'lucide-angular';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: 'app-menu-sidebar',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.css'
})
export class MenuSidebarComponent {

  protected readonly circleX: LucideIconData = CircleX;
  protected readonly cogIcon: LucideIconData = Cog;
  protected readonly listIcon: LucideIconData = ListPlus;
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  closeSidebar(): void {
    this.closed.emit();
  }

  logout(): void {
    this.authService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    });
  }


}
