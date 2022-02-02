import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageComponent } from './app.imageComponent';

const API_KEY = '29da4ec7282240ef1d0ef8f30d376d85'; // Use v3
// const BASE_URL = 'http://api.themoviedb.org/3/discover/movie?api_key='
//   + API_KEY
//   + '&primary_release_date.gte=2019-01-01'
//   + '&primary_release_date.lte=2019-02-25'
//   + '&page=1&with_genres=16';

const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
  + API_KEY
  + '&language=en-US';


@Component({
  selector: 'app-root',
  template: `
                <router-outlet></router-outlet><br/>
                <nav>
                    <a routerLink="/home" routerLinkActive="active">Home</a> |
                    <a routerLink="/about" routerLinkActive="active">About</a>
                    </nav>
                    <h1>Genres</h1>
                    <select [(ngModel)]="selectedGenre" (ngModelChange)="submitGenreChoice()">
                    <option *ngFor="let genre of _genreArray" [ngValue]="genre.id">
                    {{genre.name}}
                    </option>
                    </select>

                    <div class="pageButtons">
                    <button (click)="pageCounterSubtractOne()" (click)="submitNewChoice()">-</button>
                    <button (click)="pageCounterAddOne()" (click)="submitNewChoice()">+</button>
                    {{this.currentPage}}/{{this.maxPages}}
                    </div>

                <h1>Movies</h1>
                <ul>
                    <li *ngFor="let movie of _movieArray">
                      <div class="eachMovie">
                    <h2>{{movie.title}}</h2>
                    <h3>{{movie.overview}}</h3>
<movieImage [moviePosterPath]="movie.poster_path"></movieImage>
                      </div>
                    </li>
                </ul>
                
              `
})

export class AppComponent {

  _movieArray!: Array<any>;
  _genreArray!: Array<any>;
  _http: HttpClient;

  @Input()
  selectedGenre!: string;

  currentPage!: number;
  maxPages!: number;

  oprationalDate!: string;
  pastDate!: string;
  currentDate!: string;


  constructor(private http: HttpClient) {
    this._http = http;
  }

  ngOnInit() {
    this.getDateRange();
    this.currentPage = 1;
    this.getMovies();
    this.getGenres();
    this.maxPages = 100;
  }

  getMovies() {

    const BASE_URL = 'http://api.themoviedb.org/3/discover/movie?api_key='
      + API_KEY
      + `&primary_release_date.gte=${this.pastDate}`
      + `&primary_release_date.lte=${this.currentDate}`
      + `&page=${this.currentPage}`;


    this._http.get<any>(BASE_URL)
      .subscribe({
        next: (data) => {
          this._movieArray = data.results;
          console.log(this._movieArray)
        },
        error: (er) => {
          // Let user know about the error.
          alert(er);
          console.error(er);
        }
      });
  }

  getGenres() {
    this._http.get<any>(GENRE_URL)
      .subscribe({
        next: (data) => {
          this._genreArray = data.genres;
          console.log(JSON.stringify(this._genreArray));
        },
        error: (er) => {
          // Let user know about the error.
          alert(er);
          console.error(er)
        }
      });
  }

  pageCounterAddOne() {
    if (this.currentPage < this.maxPages) {
      this.currentPage = this.currentPage + 1
    }
  }

  pageCounterSubtractOne() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1
    }
  }

  submitNewChoice() {
    const BASE_URL = 'http://api.themoviedb.org/3/discover/movie?api_key='
      + API_KEY
      + `&primary_release_date.gte=${this.pastDate}`
      + `&primary_release_date.lte=${this.currentDate}`
      + `&page=${this.currentPage}&with_genres=${this.selectedGenre}`;

    this._http.get<any>(BASE_URL)
      .subscribe({
        next: (data) => {
          let page = data.page;
          console.log(page + "This is the current page")
          let totalPages = data.total_pages;
          this.maxPages = data.total_pages;
          console.log(this.maxPages + "This is the max pages")
          this._movieArray = data.results;
        },
        error: (er) => {
          // Let user know about the error.
          alert(er);
          console.error(er);
        }
      });
  }

  submitGenreChoice() {
    const BASE_URL = 'http://api.themoviedb.org/3/discover/movie?api_key='
      + API_KEY
      + `&primary_release_date.gte=${this.pastDate}`
      + `&primary_release_date.lte=${this.currentDate}`
      + `&page=${this.currentPage}&with_genres=${this.selectedGenre}`;

    this.currentPage = 1
    this._http.get<any>(BASE_URL)
      .subscribe({
        next: (data) => {
          this.maxPages = data.total_pages;
          this._movieArray = data.results;
        },
        error: (er) => {
          // Let user know about the error.
          alert(er);
          console.error(er);
        }
      });
  }


  getFormattedDate(dt: Date) {
    // year
    this.oprationalDate = dt.getFullYear().toString();
    // month
    let currentMonth = Number(dt.getMonth()) + 1

    if (currentMonth < 10) {
      this.oprationalDate = this.oprationalDate + "-" + "0" + currentMonth.toString();
    }
    else {
      this.oprationalDate = this.oprationalDate + "-" + currentMonth.toString();
    }
    //
    // day
    let currentDay = dt.getDate()
    if (currentDay < 10) {
      this.oprationalDate = this.oprationalDate + "-" + "0" + currentDay.toString();
    }
    else {
      this.oprationalDate = this.oprationalDate + "-" + currentDay.toString();
    }
  }

  getDateRange() {
    let today = new Date();
    this.getFormattedDate(today);
    this.currentDate = this.oprationalDate;
    console.log(this.currentDate)

    let thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    this.getFormattedDate(thirtyDaysAgo);
    this.pastDate = this.oprationalDate;
    console.log(this.pastDate)
  }
}