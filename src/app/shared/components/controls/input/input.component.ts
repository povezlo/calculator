import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Amount } from 'src/app/shared/interfaces';
import { transformCurrency, transformUSDtoNumber } from 'src/app/shared/utils';

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
  investmentAmount = '';
  isDisabled = false;

  private propagateChange: (fn: any) => void = (fn: any) => {};
  private propagateTouched: () => void = () => {};

  writeValue(value: string): void {
    this.investmentAmount = value ?? Amount.OneThousand;
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
    this.investmentAmount = (<HTMLInputElement>eventInput.target).value;
    this.propagateChange(this.investmentAmount);
    this.changed.emit(this.investmentAmount);
  }

  onBlur(): void {
    this.propagateTouched();
  }

  decreaseAmount() {
    let clearNumber = transformUSDtoNumber(this.investmentAmount);

    clearNumber = clearNumber - 1000;

    const formatCurrency = transformCurrency(clearNumber, { maxValue: true });;

    this.investmentAmount = `$${formatCurrency}`;
  }

  increaseAmount() {
    let clearNumber = transformUSDtoNumber(this.investmentAmount);

    clearNumber = clearNumber + 1000;

    const formatCurrency = transformCurrency(clearNumber, { maxValue: false });;

    this.investmentAmount = `$${formatCurrency}`;
  }
}
