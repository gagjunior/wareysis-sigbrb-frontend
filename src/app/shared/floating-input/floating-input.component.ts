import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-floating-input',
  imports: [],
  templateUrl: './floating-input.component.html',
  styleUrl: './floating-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingInputComponent),
      multi: true
    }
  ]
})
export class FloatingInputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() id!: string;
  @Input() label!: string;
  @Input() required: boolean = false;

  value: any = '';
  isDisabled = false;

  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

}
