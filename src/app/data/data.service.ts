import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Data } from "./data.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  getLaunchpads(): Observable<Data[]> {
    return this.http.get<Data[]>("https://api.spacexdata.com/v4/launchpads");
  }
}
