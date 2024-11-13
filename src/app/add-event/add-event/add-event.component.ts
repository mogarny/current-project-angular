import { Component } from '@angular/core';
import { Event } from '../../models/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../service';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrl: './add-event.component.scss',
})
export class AddEventComponent {
    eventForm: FormGroup;
    isEditMode: boolean = false;
    id: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private eventService: EventService
    ) {
        this.eventForm = this.fb.group({
            title: ['', Validators.required],
            start: ['', Validators.required],
            end: [''],
            people: [''],
        });

        this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];

            if (this.id) {
                this.isEditMode = true;
                this.loadEventData(this.id);
            } else {
                this.isEditMode = false;
            }
        });
    }

    loadEventData(id: string) {
        const eventToEdit: Event = this.eventService.getEvent(id);
        if (eventToEdit) {
            console.log(eventToEdit.start);

            this.eventForm.patchValue({
                title: eventToEdit.title,
                start: (eventToEdit.start as string).replace(/\+.*/, ''),
                end: (eventToEdit.end as string).replace(/\+.*/, ''),
                people: eventToEdit.people,
            });
        }
    }

    saveEvent(e: SubmitEvent) {
        e.preventDefault();
        console.warn(this.eventForm.value);
        if (this.eventForm.valid) {
            const newEvent: Event = {
                id: this.isEditMode && this.id ? this.id : uuidv4(),
                title: this.eventForm.get('title')?.value,
                start: this.eventForm.get('start')?.value,
                end: this.getEndTime(this.eventForm),
                people: this.eventForm.get('people')?.value || null,
            };

            if (this.isEditMode && this.id) {
                this.eventService.updateEvent(newEvent);
            } else {
                this.eventService.setEvent(newEvent);
            }
        }
        this.router.navigate(['/']);
    }

    getEndTime(eventToEdit: FormGroup<any>) {
        console.log(
            eventToEdit.value.start,
            eventToEdit.value.end,
            this.addMinutes(eventToEdit.value.start!.toString()!, 60)
        );

        if (eventToEdit.value.end === '') {
            return this.addMinutes(eventToEdit.value.start!.toString()!, 60);
        }
        return eventToEdit.value.end;
    }

    addMinutes(date: string, minutes: number) {
        const newDate = new Date(new Date(date).getTime() + minutes * 60000);
        return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${newDate
            .getDate()
            .toString()
            .padStart(2, '0')}T${newDate
            .getHours()
            .toString()
            .padStart(2, '0')}:${newDate
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${newDate
            .getSeconds()
            .toString()
            .padStart(2, '0')}`;
    }
}
