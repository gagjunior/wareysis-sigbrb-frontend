import {Component} from '@angular/core';
import {MenuSidebarComponent} from './menu-sidebar/menu-sidebar.component';
import {Cog, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [
    MenuSidebarComponent,
    LucideAngularModule
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
