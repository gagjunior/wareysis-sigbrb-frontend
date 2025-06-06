import {Component} from '@angular/core';
import {MenuSidebarComponent} from './menu-sidebar/menu-sidebar.component';
import {Cog, LucideAngularModule} from 'lucide-angular';
import {TopNavbarComponent} from './top-navbar/top-navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuSidebarComponent,
    LucideAngularModule,
    TopNavbarComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  readonly cogIcon = Cog;

  isSidebarOpen = false;

  openMenuSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeMenuSidebar(): void {
    this.isSidebarOpen = false;
  }

}
