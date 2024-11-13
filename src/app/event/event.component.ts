import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../models/model';
import { toSvg } from 'jdenticon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventService } from '../service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrl: './event.component.scss',
})
export class EventComponent {
    id!: string;
    event?: Event;
    events: Event[] = [];
    svg!: SafeHtml;

    constructor(
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private eventService: EventService,
        private router: Router
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'] as string;
            console.log('Event ID:', this.id);

            this.events = eventService.getEvents();

            this.event = this.events.find(
                (event: Event) => event.id?.toString() === this.id
            );

            this.event!.start! = new Date(
                this.event!.start! as string
            ).toLocaleString();

            this.event!.end! = new Date(
                this.event!.end! as string
            ).toLocaleString();

            if (this.event) {
                this.svg = this.sanitizer.bypassSecurityTrustHtml(
                    toSvg(this.event.title, 100)
                );
            }
        });
    }

    editEvent() {
        this.router.navigate(['../add-event', this.event?.id]);
    }

    deleteEvent(id: string | undefined) {
        this.eventService.deleteEvent(id);
        this.router.navigate(['/']);
    }
}
