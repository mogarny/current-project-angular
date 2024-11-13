import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
    {
        path: '',
        component: CalendarComponent,
    },

    {
        path: 'event/:id',
        loadChildren: () =>
            import('./event/event.module').then((m) => m.EventModule),
    },

    {
        path: 'add-event',
        loadChildren: () =>
            import('./add-event/add-event.module').then(
                (m) => m.AddEventModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
