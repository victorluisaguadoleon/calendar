import { SimpleDay } from './simple-day.model';

export class HolidayCollection {
    errors: string[];

    holidays: [{
        country: {id: string, name: string},
        date: { datetime: {year: number, month: number, day: number} }
    }];

    version: number;
}
