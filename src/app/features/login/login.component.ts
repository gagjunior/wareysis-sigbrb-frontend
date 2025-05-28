import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {NgClass, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {RodapeComponent} from '../../shared/rodape/rodape.component';
import {FloatingInputComponent} from '../../shared/floating-input/floating-input.component';

@Component({
  selector: 'app-login',
  imports: [
    NgClass,
    NgStyle,
    RouterLink,
    RodapeComponent,
    FloatingInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLargeScreen: boolean = false;
  breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .subscribe(result => {
      this.isLargeScreen = result.matches;
    });
  }

}
