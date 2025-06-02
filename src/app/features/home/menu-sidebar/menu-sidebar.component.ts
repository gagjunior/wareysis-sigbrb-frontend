import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CircleX, Cog, LucideAngularModule, LucideIconData} from 'lucide-angular';
import {AuthService} from '../../../core/auth/auth.service';

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
      console.log('Logout realizado com sucesso!');
      this.router.navigate(['/login']);
    });
  }


}
