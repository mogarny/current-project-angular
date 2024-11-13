import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
    calendarOptions: CalendarOptions;

    constructor(private router: Router, private eventService: EventService) {
        this.calendarOptions = {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            weekends: true,
            editable: true,
            droppable: true,
            eventDrop: this.handleEventDrop.bind(this),
            events: this.eventService.getEvents(),
            eventClick: this.handleClick.bind(this),
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'customAddEventButton',
            },
            customButtons: {
                customAddEventButton: {
                    text: 'Add Event',
                    click: () => {
                        this.router.navigate(['/add-event']);
                    },
                },
            },
        };
    }

    handleEventDrop(eventToSave: any) {
        this.eventService.updateEvent(eventToSave.event);
    }

    handleClick(arg: any) {
        console.log('Event clicked: ', arg.event);
        const eventId = arg.event.id;
        this.goToEvent(eventId);
    }

    goToEvent(eventId: string) {
        this.router.navigate([`/event/${eventId}`]);
    }
}
