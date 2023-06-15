import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRating } from '../models/rating.interface';

const API_URL = environment.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _http: HttpClient) { }

  public getMovies(page_id: number, genre?: string, year?: string, title?: string): Observable<any> {
    let url = `${API_URL}/movies/${page_id}?`;
    if (title) {
      url += `title=${title}&`;
    }
    if (genre) {
      url += `genre=${genre}&`;
    }
    if (year) {
      url += `year=${year}`;
    }
    return this._http.get(url);
  }

  public getMovie(movie_id: number): Observable<any> {
    const url = `${API_URL}/movie-details/${movie_id}`;
    return this._http.get(url);
  }

  public addRating(movie_rating: IRating): Observable<any> {
    const url = `${API_URL}/ratings`;
    return this._http.post(url, movie_rating)
  }

  public getRatings(movie_id: any): Observable<any> {
    const url = `${API_URL}/ratings/${movie_id}`;
    return this._http.get(url);
  }

  public getUserRating(movie_id: any, user_id: any): Observable<any> {
    const url = `${API_URL}/ratings/${movie_id}/${user_id}`;
    return this._http.get(url);
  }
}
