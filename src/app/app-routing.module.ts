import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  },
  {
    path: 'list', component: ListComponent
  },
  {
    path: 'detail/:id', component: FilmDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
