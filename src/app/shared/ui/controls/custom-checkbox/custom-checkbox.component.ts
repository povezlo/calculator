import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Value} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = 'Lorem ipsum';
  @Output() changed = new EventEmitter<boolean>();

  value: Value[] = [];
  isDisabled = false;

  private propagateChange: any = () => {};

  writeValue(value: Value[]): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(evt: Event): void {
    const selected = (evt.target as HTMLInputElement).checked;
    this.propagateChange(selected);
    this.changed.emit(selected);
  }

  isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }
}
