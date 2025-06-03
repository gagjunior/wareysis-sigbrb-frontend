import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [
    NgStyle
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() visible: boolean = false;
  @Input() operacao?: string;
  @Input() status?: string;
  @Input() message?: string;

  @Output() close = new EventEmitter<boolean>();

  closeModal(): void {
    this.close.emit(false);
  }

}
