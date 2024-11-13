import { Injectable } from '@angular/core';
import { Event } from './models/model';

Injectable({
    providedIn: 'root',
});

export class EventService {
    getEvents(): Event[] {
        return JSON.parse(localStorage.getItem('events') ?? '[]');
    }

    getEvent(id: string): Event {
        return JSON.parse(localStorage.getItem('events') ?? '[]').find(
            (event: Event) => event.id === id
        );
    }

    setEvent(newEvent: Event) {
        let events = JSON.parse(localStorage.getItem('events') || '[]');
        if (!Array.isArray(events)) {
            events = [];
        }
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
    }

    deleteEvent(id: string | undefined): void {
        localStorage.setItem(
            'events',
            JSON.stringify(
                this.getEvents().filter((event: Event) => event.id !== id)
            )
        );
    }

    updateEvent(updatedEvent: Event) {
        let events: Event[] = JSON.parse(
            localStorage.getItem('events') || '[]'
        );

        events = events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
        );
        localStorage.setItem('events', JSON.stringify(events));
    }
}
