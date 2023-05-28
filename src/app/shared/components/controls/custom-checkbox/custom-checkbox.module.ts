import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './custom-checkbox.component';
import { CustomIconModule } from '../../custom-icon';



@NgModule({
    declarations: [CheckboxComponent],
    imports: [
        CommonModule,
        CustomIconModule
    ],
    exports: [
        CheckboxComponent
    ]
})
export class CheckboxModule { }
