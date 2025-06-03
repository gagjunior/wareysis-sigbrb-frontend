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
    if (!this.control?.errors) return [];

    const errors: ValidationErrors = this.control.errors;

    const messagesMap: Record<string, (err: any) => string> = {
      required: () => 'Este campo é obrigatório.',
      email: () => 'Formato de e-mail inválido.',
      minlength: (err) => `Mínimo de ${err.requiredLength} caracteres.`,
      passwordsMismatch: () => 'As senhas não conferem.'
    };

    return Object.keys(errors).map(key => {
      const generateMessage = messagesMap[key];
      return generateMessage ? generateMessage(errors[key]) : '';
    }).filter(msg => msg);
    ;
  }

}
