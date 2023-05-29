import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { ICurrency } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AutocompleteComponent),
          multi: true
        }
    ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() items: ICurrency[] = [];
  @Output() changed = new EventEmitter<ICurrency>();

  filteredOptions: ICurrency[] = [];
  optionsSource$ = new Subject<ICurrency[]>();
  options$: Observable<ICurrency[]> | null = null;

  isOpenSelect: boolean = false;
  currency: ICurrency | null = null;

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

  constructor() {
    this.options$ = this.optionsSource$.asObservable();
  }

  ngOnInit(): void {
      this.optionsSource$.next(this.items);
  }

  writeValue(currency: ICurrency): void {
      this.currency = currency;
  }

  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.propagateTouched = fn;
  }

  openSelect(): void {
      this.optionsSource$.next(this.items);
      this.isOpenSelect = true;
  }

  selectOption(currency: ICurrency): void {
      this.currency = currency;
      this.propagateChange(currency);
      this.changed.emit(currency);
      this.isOpenSelect = false;
  }

  filterInput(eventInput: Event): void {
    const { value } = (<HTMLInputElement>eventInput.target);
    this.isOpenSelect = true;

    const filteredOptions = this.items.filter((option: ICurrency) => option.name.toLowerCase().includes(value.toLowerCase()));
    this.optionsSource$.next(filteredOptions);
  }
}
