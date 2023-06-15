import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  public message: string = '';

  constructor(private _userServie: UserService, private _fb: FormBuilder, private _router: Router) { }

  public ngOnInit(): void {
    const RegEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,6}$/;

    this.signupForm = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(RegEmail)]],
      firstname: [''],
      lastname: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit(): any {
    const user = this.signupForm?.value;
    this._userServie.signup(user).subscribe(
      response => {
        this._router.navigate(['/login'])
      },
      error => {
        if (error.status === 500) {
          this.message = 'Error! User already exists.';
        } else {
          this.message = 'Error! User not created.';
        }
      }
    );
  }
}
