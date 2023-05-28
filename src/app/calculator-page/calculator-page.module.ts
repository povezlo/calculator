import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorPageComponent } from './calculator-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AmountInputModule, CheckboxModule, FormFieldModule, SelectModule } from '../shared';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CalculatorPageComponent
  },
];

@NgModule({
  declarations: [
    CalculatorPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormFieldModule,
    AmountInputModule,
    SelectModule,
    CheckboxModule
  ],
  exports: [CalculatorPageComponent]
})
export class CalculatorPageModule { }