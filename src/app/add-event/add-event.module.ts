import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEventRoutingModule } from './add-event-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AddEventComponent],
    imports: [CommonModule, AddEventRoutingModule, ReactiveFormsModule],
})
export class AddEventModule {}
