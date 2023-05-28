import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';


@NgModule({
    declarations: [SelectComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        SelectComponent
    ]
})
export class SelectModule { }
