import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { ApiModule } from '@app/api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    ApiModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'movies',
        loadChildren: () => import('@app/pages/movies-list').then(({ MoviesListModule }) => MoviesListModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'movies'
      }
    ])
  ]
})
export class AppModule { }