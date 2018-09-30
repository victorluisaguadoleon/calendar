import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';



export const HOLIDAY_SERVER_URL = 'HOLIDAY_SERVER_URL';
export const HOLIDAY_END_POINT = 'HOLIDAY_END_POINT';

export class HolidayService {

    constructor(@Inject(HttpClient) private httpClient: HttpClient,
        @Inject(HOLIDAY_SERVER_URL) private holidayServerUrl: string,
        @Inject(HOLIDAY_END_POINT) private holidayEndPoint: string) {

    }
}
