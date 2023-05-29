import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Amount,
  ICalculateDate,
  ICurrency,
  MAX_VALUE_ONE_MILLION,
  ONE_HUNDRED_PERCENT,
  transformUSDtoNumber
  } from '../shared';

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

  profit: string = Amount.OneThousand;
  percent = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [Amount.OneThousand, {
        updateOn: 'change',
      }],
      currency: [this.currencyList[0], {
        updateOn: 'change',
      }],
      period: ['12', {
        updateOn: 'change'
      }],
      checkbox: [null, {
        updateOn: 'change'
      }],
    });

    this.form.valueChanges.subscribe((calculateData: ICalculateDate) => {

      this.calculateData = calculateData;
      console.log(calculateData);
      this.calculateProfit();
    });
  }

  calculateProfit(): void {
    if(!this.calculateData) {
      return;
    }
    const { amount, period, currency } = this.calculateData;

    let filteredAmount = transformUSDtoNumber(amount);

    const result = filteredAmount * parseInt(currency.apr) / ONE_HUNDRED_PERCENT * parseInt(period) / 12;
    const formattedValue = Math.min(result, MAX_VALUE_ONE_MILLION).toLocaleString('en-US', { minimumFractionDigits: 0 });
    this.profit = `$${formattedValue}`;
    this.percent = parseInt(currency.apr);
  }
}
