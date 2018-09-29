import { Month } from './month.model';
import { Day } from './day.model';

export interface MonthDays {
    month: Month;

    year: number;

    days: Day[];
}
