import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {PropagateFn, Value} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-custom-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() items: string[] = [];
  @Input() selectedItem = 'Select';
  @Input() isDisabled: boolean | null = null;

  value: Value | null = null;
  isOpenSelect = false;
  isBlocked = false;

  ngOnInit(): void {
    this.isBlocked = !!this.isDisabled;
  }

  private propagateChange?: PropagateFn<string>;
  private propagateTouched?: PropagateFn<void>;

  writeValue(value: Value): void {
    this.value = value;
  }

  registerOnChange(fn: PropagateFn<string>): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: PropagateFn<void>): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  openSelect(): void {
    this.isOpenSelect = !this.isOpenSelect;
  }

  selectOption(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    if(this.propagateChange) this.propagateChange(value);
  }
}
