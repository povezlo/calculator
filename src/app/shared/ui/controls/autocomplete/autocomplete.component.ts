import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { ICurrency, Value } from 'src/app/shared/interfaces';

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

    formControl = new FormControl();
    options$: Observable<ICurrency[]> | null = null;
    keyword = 'name';
    placeholder = '';

    constructor() { }

    ngOnInit(): void {
        this.placeholder = `${this.items[0].name}`;
    }

    private propagateChange: (fn: any) => void = (fn: any) => {};
    private propagateTouched: () => void = () => {};

    writeValue(value: Value): void {
        const selectedOption = this.items.find(item => item.name === value);
        this.formControl.setValue(selectedOption);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.formControl.disable();
        } else {
            this.formControl.enable();
        }
    }

    onBlur(): void {
        this.propagateTouched();
    }


  selectEvent(item: ICurrency): void {
        this.propagateChange(item);
        this.changed.emit(item);
  }
}
