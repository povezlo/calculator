import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Amount, regex, regexErrors } from '../shared';

@Component({
  selector: 'app-calculator-page',
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorPageComponent implements OnInit {
  form!: FormGroup;

  periods: string[] = ['1', '3', '6', '9', '12', '24'];

  regexErrors = regexErrors;
  result = Amount.Zero;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [null, {
        updateOn: 'change',
      }],
      currency: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.numbers)
        ]
      }],
      periods: [null, {
        updateOn: 'change'
      }],
      checkbox: [null, {
        updateOn: 'change'
      }],
    });

    this.form.valueChanges.subscribe(value => {
      this.result = value.amount;
      console.log('form', value);
    });
  }

  calculateProfit() {
  }
}
