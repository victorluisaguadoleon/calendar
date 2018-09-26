import { DayType } from '../models/day-type.model';


export class CalendarService {
    protected readonly monthRest: number[];

    private readonly monthDayCOunt: number[];

    constructor() {
        this.monthRest = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        this.monthDayCOunt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    public static isLeapYear(year: number): boolean {
        return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
    }
}
