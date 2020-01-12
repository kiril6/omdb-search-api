import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private _httpClient: HttpClient) { }

  results: any = [];
  resultDetails: any = [];
  moreDetails: boolean[] = [];
  searchField = '';
  searched = false;

  //omdb api to get movie titles
  public getMovies(title) {
    this._httpClient.get("https://www.omdbapi.com/?apikey=72e977a2&s=" + title)
      .subscribe((data: any) => {
        this.results = data.Search;
      })
  }

  //omdb api to get specific details of an movie by its id
  public getDetails(imdbID) {
    this._httpClient.get("https://www.omdbapi.com/?apikey=72e977a2&i=" + imdbID)
      .subscribe((dataDetails: any) => {
        this.resultDetails = dataDetails;
      })
  }

  //when search value is entered
  search() {
    this.getMovies(this.searchField);
    this.searched=true;
  }

  //registering input field as typing
  onSearchChange(searchValue: string): void {  
    if(searchValue==='') {
      this.resetActiveSearch();
      this.searched = false;
    }
  }

  //to show more details when pressed
  showDetails(id, imdbID) {
    for (let i = 0; i <= this.results.length; i++) {
      this.moreDetails[i] = false;
    }
    this.moreDetails[id] = true;
    this.getDetails(imdbID)
    if (this.moreDetails[id] === true) {
      location.href = '#';
    }
  }

  //when logo is clicked
  reload() {
    this.searchField = '';
    this.resetActiveSearch();
  }

  //reseting the detail view boolean
  resetActiveSearch() {
    if (this.results) {
      for (let i = 0; i <= this.results.length; i++) {
        this.moreDetails[i] = false;
      }
      this.results = null;
      this.resultDetails = null;
    }
  }

}
