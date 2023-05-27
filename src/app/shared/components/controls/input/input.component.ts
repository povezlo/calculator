import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Amount } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Output() changed = new EventEmitter<string>();
  value = '';
  isDisabled = false;

  private propagateChange: (fn: any) => void = (fn: any) => {};
  private propagateTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? Amount.OneThousand;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(eventInput: Event): void {
    this.value = (<HTMLInputElement>eventInput.target).value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
