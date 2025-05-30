import {Component, EventEmitter, Output} from '@angular/core';
import {Cog, LucideAngularModule, LucideIconData, Menu, SquareMenu} from 'lucide-angular';

@Component({
  selector: 'app-top-navbar',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {


  protected readonly menu :LucideIconData = Menu;

  @Output() menuClicked = new EventEmitter<void>();

}
