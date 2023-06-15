import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/components/nav/nav.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { MovieDetailsComponent } from './movie/components/movie-details/movie-details.component';
import { MoviesComponent } from './movie/components/movies/movies.component';
import { LoginComponent } from './user/components/login/login.component';
import { SignupComponent } from './user/components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './auth/interceptors/jwt.interceptor';
import { MovieFinderComponent } from './movie/components/movie-finder/movie-finder.component';
import { MovieRatingsComponent } from './movie/components/movie-ratings/movie-ratings.component';
import { MovieViewComponent } from './movie/components/movie-view/movie-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    MovieDetailsComponent,
    MoviesComponent,
    LoginComponent,
    SignupComponent,
    MovieFinderComponent,
    MovieRatingsComponent,
    MovieViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
