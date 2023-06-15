import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public message: string = '';

  constructor(private _userService: UserService, private _router: Router, private _fb: FormBuilder) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    this._userService.login(email, password).subscribe(
      response => {
        this._router.navigate(['/movies']);
      },
      error => {
        this.message = error.error.message;
      }
    );
  }
}

