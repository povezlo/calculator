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
  regexErrors = regexErrors;
  result = Amount.Zero;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [null, {
        updateOn: 'change',

        validators: [
          Validators.required
        ]
      }],
      currency: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.numbers)
        ]
      }],
      select: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      checkbox: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
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
