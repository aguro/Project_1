import { Component, Input } from '@angular/core';
import { IMovies } from '../../models/movies.interface';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent {

  @Input() public movies: IMovies[] = [];

  public handleError(event: any) {
    event.target.src = '../../../../assets/no-photo.png';
  }
}
