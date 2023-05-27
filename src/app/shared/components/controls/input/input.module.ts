import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormatCurrencyPipe } from 'src/app/shared/pipes';
import { DigitsLimitDirective } from 'src/app/shared/directives';

@NgModule({
  declarations: [
    InputComponent,
    FormatCurrencyPipe,
    DigitsLimitDirective
  ],
  imports: [CommonModule],
  exports: [
    InputComponent,
    FormatCurrencyPipe,
    DigitsLimitDirective
  ],
})
export class InputModule {}
