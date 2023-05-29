import {CurrencyPipe} from '@angular/common';
import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {
  Amount,
  MIN_VALUE_ONE_THOUSAND,
  NON_LETTER_PATTERN,
  NUMERIC_PATTERN,
} from '../interfaces';
import {transformUSDtoNumber, transformCurrency} from '../utils';

@Directive({
  selector: '[appDigitsLimit]',
  providers: [CurrencyPipe],
})
export class DigitsLimitDirective {
  @Output() setDefaultValue: EventEmitter<string> = new EventEmitter();

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const initialValue = this.el.nativeElement.value;
    const currency = initialValue.replace(NON_LETTER_PATTERN, '');

    const clearNumber = transformUSDtoNumber(currency);

    const formatCurrency = transformCurrency(clearNumber, {maxValue: false});

    this.el.nativeElement.value = `$${formatCurrency}`;
    this.currencyPipe.transform(parseFloat(formatCurrency));

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('blur', ['$event']) onBlur(event: Event) {
    const initialValue = this.el.nativeElement.value;
    const currentNumber = parseFloat(
      String(initialValue).replace(NUMERIC_PATTERN, '')
    );

    if (currentNumber < MIN_VALUE_ONE_THOUSAND) {
      this.el.nativeElement.value = Amount.OneThousand;
      this.setDefaultValue.emit(this.el.nativeElement.value);
    }

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
