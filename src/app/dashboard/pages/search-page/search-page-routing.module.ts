import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDetailPageComponent } from './pages/search-detail/search-detail-page.component';
import { MovieInfoResolver } from './resolvers/movie-info.resolver';
import { SearchPageComponent } from './search-page.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  {
    path: ':movieId',
    component: SearchDetailPageComponent,
    resolve: { movieInfo: MovieInfoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
