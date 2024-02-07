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
  pagedLaunchpads: Data[] = [];
  searchTerm: string = "";
  currentPage: number = 1;
  pageSize: number = 3; /* Set the number of items per page, i kept it 3 because 3 looks good, feel free to change to 5, 
  i kept 3 because now i already know total is 6 :)  */


  constructor(private data: DataService) {}

  ngOnInit() {
    this.launchpads$ = this.data.getLaunchpads();
    this.launchpads$.subscribe((launchpads) => {
      this.launchpads = launchpads;
      this.filteredLaunchpads = launchpads;
      this.updatePagedLaunchpads(); // so everytime data is fetched, we can calculate the total number os paged we need and how many objects will be therer 
    }); // so if 12 objects, we know 4 pages, 12/3 =4 , so we called it here instead 
  }

  filterLaunchpads() {
    if (!this.searchTerm) {
      this.filteredLaunchpads = this.launchpads;
    } else {
      this.filteredLaunchpads = this.launchpads.filter((launchpad) => {
        const nameMatch = launchpad.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const regionMatch =
          launchpad.region && launchpad.region.toLowerCase().includes(this.searchTerm.toLowerCase());

        return nameMatch || regionMatch;
      });
    }

    this.updatePagedLaunchpads();// to check the content on the the other page, we do this,
    // basically filtering  on page 2  and so on:) 
  }

  updatePagedLaunchpads() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedLaunchpads = this.filteredLaunchpads.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedLaunchpads();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedLaunchpads();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLaunchpads.length / this.pageSize);
  }
}
