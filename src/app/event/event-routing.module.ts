import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { AddEventComponent } from '../add-event/add-event/add-event.component';

const routes: Routes = [
    { path: '', component: EventComponent },
    { path: 'add-event:id', component: AddEventComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventRoutingModule {}
