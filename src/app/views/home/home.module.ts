import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MyDatePickerModule } from 'mydatepicker';
import { NumericInputComponent } from 'ng2-numeric-input';


import { HomeViewComponent } from './home-view.component';


@NgModule({
    declarations: [
        HomeViewComponent,
        NumericInputComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        MyDatePickerModule
    ],
    exports: [
        HomeViewComponent
    ]
})
export class HomeModule {
}
