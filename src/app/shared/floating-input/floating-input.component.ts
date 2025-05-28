import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-floating-input',
  imports: [],
  templateUrl: './floating-input.component.html',
  styleUrl: './floating-input.component.css'
})
export class FloatingInputComponent {
  @Input() type: string = 'text';
  @Input() id!: string;
  @Input() label!: string;
  @Input() required: boolean = false;

}
