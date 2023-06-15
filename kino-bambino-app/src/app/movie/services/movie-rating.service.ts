import { Injectable, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IRating } from '../models/rating.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieRatingService implements OnInit {

  public message: string = '';
  public movieId?: number;
  public rating: number = 5;
  public isUserLoggedIn?: boolean;
  public userRating?: number;
  public totalRating?: number;
  private _allRatings?: number[];

  constructor(private _authService: AuthService, private _movieService: MovieService, private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const movieId = this._route.snapshot.paramMap.get('id');
    const userId = this._authService.userId;
    this._getUserRating(movieId, userId);
    this._getRatings(movieId);
  }

  public addRating(): void {
    const movieRating: IRating = {
      movie_id: this.movieId ? this.movieId : 0,
      rating: this.rating,
      user_id: this._authService.userId,
    }

    this._movieService.addRating(movieRating).subscribe(
      response => {
        this.message = response.message;
      },
      error => {
        if (error.status === 409) {
          this.message = 'Error! You have already rated this film.';
        } else {
          this.message = 'Error!';
        }
      }
    );
  }

  private _getUserRating(movieId: any, userId: any): void {
    this._movieService.getUserRating(movieId, userId).subscribe(
      (response) => {
        this.userRating = response.rating;
      }
    );
  }

  private _getRatings(movieId: any): void {
    this._movieService.getRatings(movieId).subscribe(
      (response) => {
        this._allRatings = response.ratings;
        this._getTotalRating(this._allRatings);
      }
    );
  }

  private _getTotalRating(rating: any): void {
    let sum = 0;
    for (let i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    this.totalRating = sum / rating.length;
  }
}
