import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomIconComponent} from './custom-icon.component';
import {TooltipDirective} from '../../directives';

@NgModule({
  declarations: [CustomIconComponent, TooltipDirective],
  imports: [CommonModule],
  exports: [CustomIconComponent],
})
export class CustomIconModule {}
