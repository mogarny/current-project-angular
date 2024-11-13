import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from './service';

@NgModule({
    declarations: [AppComponent, CalendarComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FullCalendarModule,
        ReactiveFormsModule,
    ],
    providers: [EventService],
    bootstrap: [AppComponent],
})
export class AppModule {}
