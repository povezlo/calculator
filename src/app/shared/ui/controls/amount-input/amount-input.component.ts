import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Amount, PropagateFn} from 'src/app/shared/interfaces';
import {transformCurrency, transformUSDtoNumber} from 'src/app/shared/utils';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountInputComponent),
      multi: true,
    },
  ],
})
export class AmountInputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  investmentAmount = '';
  isDisabled = false;

  private propagateChange?: PropagateFn<string>;
  private propagateTouched?: PropagateFn<void>;

  writeValue(value: string): void {
    this.investmentAmount = value;
  }

  registerOnChange(fn: PropagateFn<string>): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: PropagateFn<void>): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(eventInput: Event): void {
    this.investmentAmount = (<HTMLInputElement>eventInput.target).value;
    if(this.propagateChange) this.propagateChange(this.investmentAmount);
  }

  onBlur(): void {
    if(this.propagateTouched) this.propagateTouched();
  }

  resetCurrency(): void {
    this.investmentAmount = Amount.OneThousand;
    if(this.propagateChange) this.propagateChange(this.investmentAmount);
  }

  decreaseAmount() {
    let clearNumber = transformUSDtoNumber(this.investmentAmount);

    clearNumber = clearNumber - 1000;

    const formatCurrency = transformCurrency(clearNumber, {maxValue: true});

    this.investmentAmount = `$${formatCurrency}`;
    if(this.propagateChange) this.propagateChange(this.investmentAmount);
  }

  increaseAmount() {
    let clearNumber = transformUSDtoNumber(this.investmentAmount);

    clearNumber = clearNumber + 1000;

    const formatCurrency = transformCurrency(clearNumber, {maxValue: false});

    this.investmentAmount = `$${formatCurrency}`;
    if(this.propagateChange) this.propagateChange(this.investmentAmount);
  }
}
