import { DayType } from '../models/day-type.model';
import { WeekDay } from '../models/week-day.model';


export class CalendarService {
    protected readonly monthRest: number[];

    private readonly monthDayCount: number[];

    constructor() {
        this.monthRest = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        this.monthDayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    public static isLeapYear(year: number): boolean {
        return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
    }

    public getMonthDayCount(month: number, year: number): number {
        if (month === 2 && CalendarService.isLeapYear(year)) {
            return this.monthDayCount[month - 1] + 1;
        }

        return this.monthDayCount[month - 1];
    }

    public getWeekDay(day: number, month: number, year: number): WeekDay {
        const mod = (day + this.monthRest[month - 1] + (((year % 400) / 100) * 5)
            + ((((year % 400) % 100) - 1) / 4) + (((year % 400) % 100) - 1)) % 7;

        return ((year % 400 !== 0) && (year % 4 === 0) && (month >= 3)) ? mod + 1 : mod;
    }
}
