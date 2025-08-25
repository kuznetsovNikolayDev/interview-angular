import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMovieComponent } from './add-movie.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddMovieComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    AddMovieComponent
  ]
})
export class AddMovieModule { }
