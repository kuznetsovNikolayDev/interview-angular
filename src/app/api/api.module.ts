import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesApiService } from './services/movies-api.service';

@NgModule({
  imports: [CommonModule],
  providers: [MoviesApiService]
})
export class ApiModule { }
