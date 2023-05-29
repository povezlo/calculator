import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormatCurrencyPipe, DigitsLimitDirective} from 'src/app/shared';
import {AmountInputComponent} from './amount-input.component';

@NgModule({
  declarations: [
    AmountInputComponent,
    FormatCurrencyPipe,
    DigitsLimitDirective,
  ],
  imports: [CommonModule],
  exports: [
    AmountInputComponent,
    FormatCurrencyPipe,
    DigitsLimitDirective
  ],
})
export class AmountInputModule {}
