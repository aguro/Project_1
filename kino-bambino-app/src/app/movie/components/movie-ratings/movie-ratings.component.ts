import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MovieService } from '../../services/movie.service';
import { MovieRatingService } from '../../services/movie-rating.service';
import { IRating } from '../../models/rating.interface';

@Component({
  selector: 'app-movie-ratings',
  templateUrl: './movie-ratings.component.html',
  styleUrls: ['./movie-ratings.component.scss']
})
export class MovieRatingsComponent implements OnInit {

  @Input() public movieId?: number;
  public message: string = '';
  public messageType: string = '';
  public rating: number = 5;
  public userRating?: number;
  public totalRating?: number;
  private _allRatings?: number[];

  constructor(public movieRatingService: MovieRatingService, private _authService: AuthService, private _movieService: MovieService) {}

  public get isUserLoggedIn(): boolean {
    return this._authService.isUserLoggedIn;
  }

  public ngOnInit(): void {
    const movieId = this.movieId;
    this._getUserRating(movieId);
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
        this.messageType = response.type;
        this.message = response.message;
      },
      error => {
        if (error.status === 409) {
          this.messageType = error.error.type;
          this.message = error.error.message;
        } else {
          this.messageType = error.error.type;
          this.message = error.error.message;
        }
      }
    );
  }

  private _getUserRating(movieId: any): void {
    if (this._authService.isUserLoggedIn) {
      const userId = this._authService.userId;
      this._movieService.getUserRating(movieId, userId).subscribe(
        (response) => {
          this.userRating = response.rating;
        },
        (error) => {
          this.userRating = undefined;
        }
      );
    }
  }

  private _getRatings(movieId: any): void {
    this._movieService.getRatings(movieId).subscribe(
      (response) => {
        this._allRatings = response.ratings;
        this._getTotalRating(this._allRatings);
      },
      (error) => {
        this.userRating = undefined;
      }
    );
  }

  private _getTotalRating(rating: any): void {
    let sum = 0;
    for (let i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    this.totalRating = +(sum / rating.length).toFixed(1);
  }
}
