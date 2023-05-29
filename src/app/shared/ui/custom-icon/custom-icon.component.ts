import {Component, Input} from '@angular/core';

@Component({
  selector: 'custom-icon',
  templateUrl: './custom-icon.component.html',
  styleUrls: ['./custom-icon.component.scss'],
})
export class CustomIconComponent {
  @Input() text: string = '';
}
