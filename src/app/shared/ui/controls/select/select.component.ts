import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Value } from 'src/app/shared/interfaces';

@Component({
    selector: 'custom-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
    @Input() items: string[] = [];
    @Input() selectedItem = 'Select';
    @Output() changed = new EventEmitter<Value>();

    value: Value | null = null;
    isDisabled: boolean | null = null;

    constructor() { }

    ngOnInit(): void {
    }

    private propagateChange: any = () => { };
    private propagateTouched: any = () => { };

    writeValue(value: Value): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onChanged(event: Event): void {
        const value = (event.target as HTMLInputElement).value;

        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    onBlur(): void {
        this.propagateTouched();
    }

}
