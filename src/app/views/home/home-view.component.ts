import { Component, OnInit, Inject } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Day } from '../../models/day.model';


@Component({
    selector: 'app-home-view',
    templateUrl: 'home-view.component.html',
    styleUrls: ['home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
    public date: Date;

    public numberOfDay: number;

    public countryCode: string;

    constructor(@Inject(CalendarService) public calendarService: CalendarService) {
        this.date = new Date(Date.now());
        this.numberOfDay = 0;
     }

    ngOnInit() {
    }

    public getCalendarDays(): Day[] {
        if (this.date === null || this.numberOfDay === null || this.numberOfDay === 0) {
            return [];
        }

        const day = this.date.getDay();
        const month = this.date.getMonth();
        const year = this.date.getFullYear();
        return this.calendarService.getDays(day, month, year, this.numberOfDay);
    }
}
