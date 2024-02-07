// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://api.spacexdata.com/v4/launchpads';

  constructor(private http: HttpClient) {}

  getLaunchpads(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl);
  }

  getLaunchpadWikipediaLink(launchpadId: string): string {
    return `https://en.wikipedia.org/wiki/${launchpadId.replace(/\s+/g, '_')}`;
  }
}
