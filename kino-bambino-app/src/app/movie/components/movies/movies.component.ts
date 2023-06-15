import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovies } from '../../models/movies.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies: IMovies[] = [];

  constructor(private _movieService: MovieService) { }

  public ngOnInit(): void {
    window.scrollTo(0, 0);
    this._getMovies();
  }

  private _getMovies(): void {
    this._movieService.getMovies(1).subscribe((data) => {
      this.movies = data.movies;
    });
  }
}
