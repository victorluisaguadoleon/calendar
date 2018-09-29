import { Component, OnInit, Inject } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Day } from '../../models/day.model';
import {IMyDpOptions} from 'mydatepicker';
import { MonthDays } from '../../models/month-days.model';
import { DayType } from '../../models/day-type.model';


@Component({
    selector: 'app-home-view',
    templateUrl: 'home-view.component.html',
    styleUrls: ['home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
    public date;

    public numberOfDay: number;

    public countryCode: string;

    public myDatePickerOptions: IMyDpOptions;

    public calendar: MonthDays[];

    constructor(@Inject(CalendarService) public calendarService: CalendarService) {
     }

    ngOnInit() {
        const date = new Date();
        this.date = { date: { year: date.getFullYear(), month: date.getMonth(), day: date.getDay() } };
        this.numberOfDay = 0;
        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy',
        };

        this.refreshCalendar();
    }

    public refreshCalendar() {
        this.calendar = this.getCalendarMonthDays();
    }

    public getWeeks(monthDays: MonthDays): any[] {
        console.log(monthDays);

        const result = [];
        let week: Day[] = [];
        for (let i = 0; i < monthDays.days.length; i++) {
            if (i !== 0 && i % 7 === 0) {
                result.push(week);

                week = [];
            }

            week.push(monthDays.days[i]);
        }

        result.push(week);

        return result;
    }

    private getCalendarMonthDays(): MonthDays[] {
        if (this.date === null || this.numberOfDay === null || this.numberOfDay === 0) {
            return [];
        }

        const day = this.date.date.day;
        const month = this.date.date.month;
        const year = this.date.date.year;

        const result = this.calendarService.getMonths(day, month, year, this.numberOfDay);
        console.log(result);

        return result;
    }

    private dayTypeToClass(value: number): any {
        return DayType[value].split(/(?=[A-Z])/).join().replace(',', ' ').toLowerCase();
    }
}
