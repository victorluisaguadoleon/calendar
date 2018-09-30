import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
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
        BsDropdownModule.forRoot(),
        MyDatePickerModule
    ],
    exports: [
        HomeViewComponent
    ]
})
export class HomeModule {
}
