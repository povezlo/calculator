import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {CalculatorPageComponent} from './calculator-page.component';
import {
  AmountInputModule,
  AutocompleteModule,
  ButtonModule,
  CheckboxModule,
  FormFieldModule,
  RatingModule,
  SelectModule,
} from '../shared';

const routes: Routes = [
  {
    path: '',
    component: CalculatorPageComponent,
  },
];

@NgModule({
  declarations: [CalculatorPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormFieldModule,
    AmountInputModule,
    SelectModule,
    CheckboxModule,
    ButtonModule,
    RatingModule,
    AutocompleteModule,
  ],
  exports: [CalculatorPageComponent],
})
export class CalculatorPageModule {}
