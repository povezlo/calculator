import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorPageComponent } from './calculator-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxesModule, FormFieldModule, InputModule, SelectModule } from '../shared';
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
    InputModule,
    SelectModule,
    CheckboxesModule
  ],
  exports: [CalculatorPageComponent]
})
export class CalculatorPageModule { }
