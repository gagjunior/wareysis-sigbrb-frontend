import {Component, inject} from '@angular/core';
import {FloatingInputComponent} from "../../shared/floating-input/floating-input.component";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [
    FloatingInputComponent,
    NgClass,
    NgStyle
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  isLargeScreen: boolean = false;
  breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .subscribe(result => {
      this.isLargeScreen = result.matches;
    });
  }

}
