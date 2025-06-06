import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RodapeComponent} from './shared/rodape/rodape.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RodapeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sigbrb-app';
}
