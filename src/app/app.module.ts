import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { routing } from './app.routing';

import { HomeModule } from './views/home/home.module';

import { CalendarService } from './services/calendar.service';
import { HolidayService, HOLIDAY_SERVER_URL, HOLIDAY_END_POINT, HOLIDAY_ACCESS_KEY, HOLIDAY_SECRET_KEY } from './services/holiday.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    routing,
    BsDropdownModule.forRoot(),
    FormsModule,

    // Views
    HomeModule
  ],
  providers: [
    { provide: HOLIDAY_SERVER_URL, useValue: 'https://api.xmltime.com/' },
    { provide: HOLIDAY_END_POINT, useValue: 'holidays' },
    { provide: HOLIDAY_ACCESS_KEY, useValue: 'FgyVTBsRga' },
    { provide: HOLIDAY_SECRET_KEY, useValue: 'cqXmmKYadXhEi4JO2XAH' },
    { provide: CalendarService, useClass: CalendarService },
    { provide: HolidayService, useClass: HolidayService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
