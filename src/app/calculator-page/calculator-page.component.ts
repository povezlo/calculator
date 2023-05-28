import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Amount, ICalculateDate, regex, regexErrors } from '../shared';

@Component({
  selector: 'app-calculator-page',
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorPageComponent implements OnInit {
  form!: FormGroup;

  periods: string[] = ['1', '3', '6', '9', '12', '24'];
  calculateData: ICalculateDate | null = null;

  regexErrors = regexErrors;
  amount: string = Amount.OneThousand;
  period = '0';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [Amount.OneThousand, {
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
      period: ['12', {
        updateOn: 'change'
      }],
      checkbox: [null, {
        updateOn: 'change'
      }],
    });

    this.form.valueChanges.subscribe((calculateData: ICalculateDate) => {
      this.amount = calculateData.amount;
      this.period = calculateData.period;
      this.calculateData = calculateData;
      console.log('form', calculateData);
    });
  }

  calculateProfit(): void {
  }
}
