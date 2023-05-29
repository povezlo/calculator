import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Amount} from 'src/app/shared/interfaces';
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
  @Output() changed = new EventEmitter<string>();
  investmentAmount = '';
  isDisabled = false;

  private propagateChange: (fn: any) => void = (fn: any) => {};
  private propagateTouched: () => void = () => {};

  writeValue(value: string): void {
    this.investmentAmount = value;
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

  resetCurrency(): void {
    this.investmentAmount = Amount.OneThousand;
    this.propagateChange(this.investmentAmount);
  }

  decreaseAmount() {
    let clearNumber = transformUSDtoNumber(this.investmentAmount);

    clearNumber = clearNumber - 1000;

    const formatCurrency = transformCurrency(clearNumber, {maxValue: true});

    this.investmentAmount = `$${formatCurrency}`;
    this.propagateChange(this.investmentAmount);
  }

  increaseAmount() {
    let clearNumber = transformUSDtoNumber(this.investmentAmount);

    clearNumber = clearNumber + 1000;

    const formatCurrency = transformCurrency(clearNumber, {maxValue: false});

    this.investmentAmount = `$${formatCurrency}`;
    this.propagateChange(this.investmentAmount);
  }
}
