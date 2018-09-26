import { DayType } from './day-type.model';
import { WeekDay } from './week-day.model';
import { Month } from './month.model';


export interface Day {
    dayType: DayType;

    month: Month;

    monthDay: number;

    weekDay: WeekDay;

    year: number;
}
