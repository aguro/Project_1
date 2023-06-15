import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser } from '../models/user.interface';

const API_URL = environment.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  public signup(user: IUser): Observable<any> {
    return this._http.post(`${API_URL}/signup`, user)
  }

  public login(email: string, password: string) {
    return this._http.post<any>(`${API_URL}/login`, { email, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._authService.currentUserSubject.next(user);
        return user;
      }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
  }
}
