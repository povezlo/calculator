import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormatCurrencyPipe } from 'src/app/shared/pipes';
import { DigitsOnlyDirective } from 'src/app/shared/directives';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputComponent,
    FormatCurrencyPipe,
    DigitsOnlyDirective
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    InputComponent,
    FormatCurrencyPipe,
    DigitsOnlyDirective
  ],
})
export class InputModule {}
