import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-onde-estamos',
  imports: [
    RouterLink
  ],
  templateUrl: './onde-estamos.component.html',
  styleUrl: './onde-estamos.component.css'
})
export class OndeEstamosComponent {

  emailBarbearia :string = 'contato@nomedaloja.com';

}
