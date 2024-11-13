import { EventInput } from '@fullcalendar/core/index.js';

export interface Event extends EventInput {
    people?: string | null;
    image?: string;
}
