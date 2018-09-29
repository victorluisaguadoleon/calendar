import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { routing } from './app.routing';

import { HomeModule } from './views/home/home.module';

import { CalendarService } from './services/calendar.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    routing,
    BsDropdownModule.forRoot(),
    FormsModule,

    // Views
    HomeModule
  ],
  providers: [
    { provide: CalendarService, useClass: CalendarService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
