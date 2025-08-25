import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '@app/api';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
  @Input() movie!: Movie;

  @Output() updateStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() handleRemove: EventEmitter<void> = new EventEmitter<void>();
}
