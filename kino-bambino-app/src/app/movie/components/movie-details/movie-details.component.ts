import { Component, OnInit } from '@angular/core';
import { IMovie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public movie?: IMovie;
  public movieId?: number;

  constructor(private _movieService: MovieService, private _route: ActivatedRoute) { }

  public ngOnInit(): void {
    window.scrollTo(0, 0);
    const movieIdFromUrl = this._route.snapshot.paramMap.get('id');
    const movieId = movieIdFromUrl ? parseInt(movieIdFromUrl, 10) : null;
    if (movieId !== null) {
      this.movieId = movieId;
      this.getMovie(movieId);
    }
  }

  public getMovie(movieId: number): void {
    this._movieService.getMovie(movieId).subscribe(
      (data) => {
        this.movie = data;
      }
    );
  }

  public handleError(event: any) {
    event.target.src = '../../../../assets/no-photo.png';
  }
}
