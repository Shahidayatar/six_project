import { Component, OnInit } from "@angular/core";
import { DataService } from "../data/data.service";
import { Observable } from "rxjs";
import { Data } from "../data/data.model";

@Component({
  selector: "app-launchpad",
  templateUrl: "./launchpad.component.html",
  styleUrls: ["./launchpad.component.css"],
})
export class LaunchpadComponent implements OnInit {
  launchpads$: Observable<Data[]> = new Observable();
  launchpads: Data[] = [];
  filteredLaunchpads: Data[] = [];
  searchTerm: string = "";

  constructor(private data: DataService) {}

  ngOnInit() {
    this.launchpads$ = this.data.getLaunchpads();
    this.launchpads$.subscribe((launchpads) => {
      this.launchpads = launchpads;
      this.filteredLaunchpads = launchpads; // Initialize filteredLaunchpads with all launchpads
    });
  }

  filterLaunchpads() {
    if (!this.searchTerm) {
      this.filteredLaunchpads = this.launchpads; // If search term is empty, show all launchpads
      return; // change before interview , when search box is emplty automatically data box is show, you did not do this
    }

    this.filteredLaunchpads = this.launchpads.filter((launchpad) => {
      const nameMatch = launchpad.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const regionMatch =
        launchpad.region && launchpad.region.toLowerCase().includes(this.searchTerm.toLowerCase());

      return nameMatch || regionMatch;
    });
  }
}
