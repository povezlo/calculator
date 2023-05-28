import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Amount, ICalculateDate, ICurrency, regex, regexErrors } from '../shared';

@Component({
  selector: 'app-calculator-page',
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorPageComponent implements OnInit {
  form!: FormGroup;

  periods: string[] = ['1', '3', '6', '9', '12', '24'];
  currencyList: ICurrency[] = [
    { name: 'TUSD (Test US Dollar)', apr: '12%' },
    { name: 'TEUR (Test Euro)', apr: '13%' },
    { name: 'TCNY (Test Chinese Yuan)', apr: '20%' },
    { name: 'TINR (Test Indian Rupee)', apr: '33%' },
    { name: 'TBRL (Test Brazilian Real)', apr: '21%' },
    { name: 'TIDR (Test Indonesian Rupiah)', apr: '80%' }
  ];
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
