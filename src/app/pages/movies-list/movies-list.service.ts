import { Injectable } from '@angular/core';
import { Movie, MoviesApiService } from '@app/api';
import { BehaviorSubject, combineLatest, Observable, tap } from 'rxjs';

@Injectable()
export class MoviesListService {
  private movies$$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  private searchName$$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public movies$: Observable<Movie[]> = this.movies$$.asObservable();
  public searchName$: Observable<string> = this.searchName$$.asObservable();

  constructor(private api: MoviesApiService) { }

  public setSearchName(searchName: string): void {
    this.searchName$$.next(searchName)
  }

  public load(): Observable<Movie[]> {
    const searchName: string = this.searchName$$.value;

    return this.api.getMovies(searchName).pipe(
      tap((movies: Movie[]) => this.movies$$.next(movies))
    );
  }

  public add(name: string): Observable<Movie> {
    return this.api.addMovie(name);
  }

  public updateStatus(movie: Movie, isOnline: boolean): Observable<Movie> {
    return this.api.updateMovie({ ...movie, isOnline });
  }

  public updateStatusAllToOnline(): Observable<Movie[]> {
    const movies: Movie[] = this.movies$$.value;

    return combineLatest(movies.map((movie) => this.api.updateMovie({ ...movie, isOnline: true })));
  }

  public remove(id: number): Observable<void> {
    return this.api.deleteMovie(id);
  }
}
