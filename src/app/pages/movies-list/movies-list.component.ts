import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, filter, map, Observable, Subject, takeUntil } from 'rxjs';

import { Movie } from '@app/api';

import { MoviesListService } from './movies-list.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  providers: [MoviesListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent implements OnInit, OnDestroy {
  public movies$: Observable<Movie[]> = this.service.movies$;
  public searchName$: Observable<string> = this.service.searchName$;

  private destroy$$: Subject<void> = new Subject<void>();

  constructor(private service: MoviesListService) { }

  ngOnInit(): void {
    this.load();

    this.searchName$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((search: string) => search.trim()),
      // Если поисковая строка пустая - получаем весь список фильмов
      filter((search: string) => !search || search.length > 3)
    ).subscribe(() => this.load());
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public trackById(index: number, movie: Movie): number {
    return movie.id;
  }

  public add(name: string): void {
    this.service.add(name).pipe(
      takeUntil(this.destroy$$)
    ).subscribe(() => this.load());
  }

  public updateStatus(movie: Movie, isOnline: boolean): void {
    this.service.updateStatus(movie, isOnline).pipe(
      takeUntil(this.destroy$$)
    ).subscribe(() => this.load());
  }

  public remove(movie: Movie): void {
    this.service.remove(movie.id).pipe(
      takeUntil(this.destroy$$)
    ).subscribe(() => this.load());
  }

  public updateStatusAllToOnline(): void {
    this.service.updateStatusAllToOnline().pipe(
      takeUntil(this.destroy$$)
    ).subscribe(() => this.load())
  }

  public setSearchName(searchName: string): void {
    this.service.setSearchName(searchName)
  }

  private load(): void {
    this.service.load().pipe(takeUntil(this.destroy$$)).subscribe();
  }
}
