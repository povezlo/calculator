import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
    declarations: [AutocompleteComponent],
    imports: [
        CommonModule,
        AutocompleteLibModule
    ],
    exports: [
        AutocompleteComponent
    ]
})
export class AutocompleteModule { }
