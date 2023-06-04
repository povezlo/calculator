import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';

import {ICurrency, PropagateFn} from 'src/app/shared/interfaces';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor {
  @Input() items: ICurrency[] = [];

  optionsSource$ = new BehaviorSubject<ICurrency[]>([]);
  options$: Observable<ICurrency[]> | null = null;

  currency: ICurrency | null = null;

  private propagateChange?: PropagateFn<ICurrency>;
  private propagateTouched?: PropagateFn<void>;

  constructor() {
    this.options$ = this.optionsSource$.asObservable();
  }

  writeValue(currency: ICurrency): void {
    this.currency = currency;
  }

  registerOnChange(fn: PropagateFn<ICurrency>): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: PropagateFn<void>): void {
    this.propagateTouched = fn;
  }

  onBlur(): void {
    if(this.propagateTouched) this.propagateTouched();
    this.currency = this.items[0];
    if(this.propagateChange) this.propagateChange(this.currency);
  }

  openSelect(): void {
    this.optionsSource$.next(this.items);
  }

  selectOption(currency: ICurrency): void {
    this.currency = currency;
    if(this.propagateChange) this.propagateChange(currency);
    this.optionsSource$.next([]);
  }

  filterInput(eventInput: Event): void {
    const {value} = <HTMLInputElement>eventInput.target;
    let filteredOptions: ICurrency[] = [];

    if (!value) {
      this.optionsSource$.next([]);
      this.currency = null;

      return;
    }

    filteredOptions = this.filterOptions(value);
    this.optionsSource$.next(filteredOptions);
  }

  private filterOptions(inputValue: string): ICurrency[] {
    return this.items.filter((option: ICurrency) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
}
