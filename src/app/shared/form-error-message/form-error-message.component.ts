import {Component, Input} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-form-error-message',
  imports: [],
  templateUrl: './form-error-message.component.html',
  styleUrl: './form-error-message.component.css'
})
export class FormErrorMessageComponent {

  @Input() control!: AbstractControl | null;

  showErrors(): boolean {
    return !!this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  errorList(): string[] {
    if (!this.control || !this.control.errors) return [];

    const errors: ValidationErrors = this.control.errors;
    const messages: string[] = [];

    if (errors['required']) messages.push('Este campo é obrigatório.');
    if (errors['email']) messages.push('Formato de e-mail inválido.');
    if (errors['minlength']) messages.push(`Mínimo de ${errors['minlength'].requiredLength} caracteres.`);
    if (errors['notSame']) messages.push('As senhas não conferem.');

    return messages;
  }

}
