import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlItem, Value } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-checkboxes',
    templateUrl: './checkboxes.component.html',
    styleUrls: ['./checkboxes.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxesComponent),
            multi: true
        }
    ]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
    @Input() items: ControlItem[] = [];
    @Output() changed = new EventEmitter<Value[]>();

    value: Value[] = [];
    isDisabled: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    private propagateChange: any = () => { };

    writeValue(value: Value[]): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onChanged(value: Value, evt: Event): void {
        const selected = this.getSelected(value, (evt.target as HTMLInputElement).checked);

        this.value = selected;
        this.propagateChange(selected);
        this.changed.emit(selected);
    }

    private getSelected(value: Value, checked: boolean): Value[] {
        const selected: Value[] = this.value ? [...this.value] : [];

        if (checked) {
            if (!selected.includes(value)) {
                selected.push(value);
            }
        } else {
            const index = selected.indexOf(value);
            selected.splice(index, 1);
        }

        return selected.length ? selected : [];
    }

    isChecked(value: Value): boolean {
        return this.value && this.value.includes(value);
    }

}
