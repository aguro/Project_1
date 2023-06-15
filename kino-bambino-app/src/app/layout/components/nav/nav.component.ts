import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {

  constructor(private _authService: AuthService, private _userService: UserService) {}

  public get isUserLoggedIn(): boolean {
    return this._authService.isUserLoggedIn;
  }
  
  public logout() {
    this._userService.logout();
  }
}
