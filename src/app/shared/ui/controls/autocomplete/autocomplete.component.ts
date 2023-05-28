import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil, distinctUntilChanged, startWith, map, filter } from 'rxjs/operators';
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
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() items: ICurrency[] = [];
    @Output() changed = new EventEmitter<ICurrency>();

    formControl = new FormControl();
    options$: Observable<ICurrency[]> | null = null;
    keyword = 'name';
    placeholder = '';

    private destroy = new Subject<void>();

    constructor() { }

    ngOnInit(): void {
        this.placeholder = `${this.items[0].name}`;

        this.options$ = this.formControl.valueChanges.pipe(
            startWith(''),
            filter(value => typeof value === 'string' || typeof value === 'object'),
            map(value => typeof value === 'string' ? value : value.label),
            map(label => label ? this.filter(label) : this.items.slice())
        );

        this.formControl.valueChanges.pipe(
            takeUntil(this.destroy),
            distinctUntilChanged()
        ).subscribe(item => {
            const value = typeof item === 'object' ? item.name : null;
            this.propagateChange(value);
            this.changed.emit(value);
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }

    private filter(value: string): ICurrency[] {
        const filterValue = value.toLowerCase();
        return this.items.filter(item => item.name.toLowerCase().includes(filterValue));
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

    displayFn(item?: ICurrency): string | undefined {
        return item ? item.name : undefined;
    }

    onBlur(): void {
        this.propagateTouched();
    }


  selectEvent(item: ICurrency): void {
        this.propagateChange(item);
        this.changed.emit(item);
  }
}
