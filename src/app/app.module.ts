import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    routing,

    // Views
    HomeModule
  ],
  providers: [
    { provide: CalendarService, useClass: CalendarService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
