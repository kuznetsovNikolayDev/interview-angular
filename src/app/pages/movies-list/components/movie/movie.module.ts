import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from './card/card.module';

import { MovieComponent } from './movie.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
  ],
  exports: [
    MovieComponent
  ]
})
export class MovieModule { }
