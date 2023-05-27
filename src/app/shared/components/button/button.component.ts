import { Component, Input } from '@angular/core';
import { ButtonType } from '../../interfaces';

@Component({
  selector: 'easy-library-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonType;
  @Input() disabled = false;

  constructor() {
    this.type = 'button';
  }
}
