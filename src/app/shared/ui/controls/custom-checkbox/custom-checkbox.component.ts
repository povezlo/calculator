import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {PropagateFn, Value} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  value: Value[] = [];
  isDisabled = false;

  private propagateChange?: PropagateFn<boolean>;
  private propagateTouched?: PropagateFn<void>;

  writeValue(value: Value[]): void {
    this.value = value;
  }

  registerOnChange(fn: PropagateFn<boolean>): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: PropagateFn<void>): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(evt: Event): void {
    const selected = (evt.target as HTMLInputElement).checked;
    if(this.propagateChange) this.propagateChange(selected);
  }

  isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }
}
