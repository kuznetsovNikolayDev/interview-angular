import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMovieComponent {
  public movieName!: string;

  @Output() addMovie: EventEmitter<string> = new EventEmitter<string>();

  public add(): void {
    this.addMovie.emit(this.movieName);

    this.movieName = '';
  }
}
