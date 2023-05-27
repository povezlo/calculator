import { Pipe, PipeTransform } from '@angular/core';
import { Amount } from '../interfaces';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: number | string): string {
    const minValue = 1000;
    const maxValue = 1000000;
    let number = 0;

    if (typeof value === 'string'  && /^[$,\d]+$/.test(value)) {
      number = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    } else {
      return Amount.OneThousand;
    }


    const formattedValue = Math.min(Math.max(minValue, number), maxValue).toLocaleString('en-US', { minimumFractionDigits: 0 });
    return `$${formattedValue}`;
  }
}
