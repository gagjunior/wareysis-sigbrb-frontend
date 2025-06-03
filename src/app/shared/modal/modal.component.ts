import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgStyle} from '@angular/common';
import {CircleX, LucideAngularModule, LucideIconData} from 'lucide-angular';

@Component({
  selector: 'app-modal',
  imports: [
    NgStyle,
    LucideAngularModule
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() visible: boolean = false;
  @Input() operacao?: string;
  @Input() status?: string;
  @Input() message?: string;
  @Input() actionLabel?: string;
  @Input() onAction?: () => void;

  @Output() close = new EventEmitter<boolean>();

  protected readonly circleX: LucideIconData = CircleX;

  closeModal(): void {
    this.close.emit(false);
  }

  onActionClick() {
    if (this.onAction) {
      this.onAction(); // executa a função passada
    }
    this.closeModal(); // opcional: fechar o modal após a ação
  }


}
