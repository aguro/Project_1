import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovies } from '../../models/movies.interface';

@Component({
  selector: 'app-movie-finder',
  templateUrl: './movie-finder.component.html',
  styleUrls: ['./movie-finder.component.scss']
})
export class MovieFinderComponent implements OnInit {

  public searchQuery?: string;
  public titleQuery?: string;
  public genreQuery?: string;
  public yearQuery?: string;
  public movies: IMovies[] = [];
  public results?: string;

  public genreOptions?: string[] = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Short Film",
    "Sport",
    "Superhero",
    "Thriller",
    "War",
    "Western"
  ];
  public yearOptions?: string[] = [];

  constructor(private _movieService: MovieService) { }

  public ngOnInit(): void {
    this._setYears();
  }

  public searchMovies(): void {
    this._movieService.getMovies(1, this.genreQuery, this.yearQuery, this.searchQuery).subscribe((data) => {
      this.movies = data.movies;
      if (this.movies === undefined) {
        this.results = 'noResults';
      } else if (this.movies.length > 0 && this.movies.length < 20) {
        this.results = 'results';
      } else if (this.movies.length === 20) {
        this.results = 'toManyResults';
      } else {
        this.results = 'noResults';
      }
    });
  }

  private _setYears(): void {
    for (let year = 2023; year >= 1900; year--) {
      this.yearOptions?.push(year.toString());
    }
  }
}
