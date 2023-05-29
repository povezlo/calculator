import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(currency: number): string {
    return `$${currency.toLocaleString('en-US', {minimumFractionDigits: 0})}`;
  }
}
