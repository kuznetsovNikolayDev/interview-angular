import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddMovieModule, MovieModule } from './components';
import { MoviesListComponent } from './movies-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    AddMovieModule,
    MovieModule,
    FormsModule,
    RouterModule.forChild([{
      path: '',
      component: MoviesListComponent
    }])
  ]
})
export class MoviesListModule { }
