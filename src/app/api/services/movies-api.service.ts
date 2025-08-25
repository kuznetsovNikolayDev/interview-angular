import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable, of } from 'rxjs';
import { Movie } from '../models';

@Injectable()
export class MoviesApiService {
  private idCounter = 1;
  private db: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);


  public getMovies(searchName: string): Observable<Movie[]> {
    return this.db.pipe(
      first(),
      map((movies: Movie[]) => searchName ? movies.filter(({ name }: Movie) => name.includes(searchName)) : movies)
    )
  }

  public addMovie(name: string): Observable<Movie> {
    const movies: Movie[] = this.db.value;
    const newMovie: Movie = { name, id: this.idCounter++, isOnline: false };

    this.db.next([...movies, newMovie]);

    return of(newMovie); // В данном случае необязательно, но сделаем это для будущего перехода на реальный API
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    const movies: Movie[] = this.db.value;

    this.db.next(
      movies.reduce((acc: Movie[], item: Movie) => [...acc, item.id === movie.id ? { ...movie } : item], [])
    )

    return of({ ...movie });
  }

  public deleteMovie(id: number): Observable<void> {
    const movies: Movie[] = this.db.value;

    this.db.next(
      movies.filter((movie: Movie) => movie.id !== id)
    );

    return of(undefined);
  }
}
