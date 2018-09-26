import { DayType } from './day-type.model';
import { WeekDay } from './week-day.model';


export interface Day {
    dayType: DayType;

    month: number;

    monthDay: number;

    weekDay: WeekDay;

    year: number;
}
