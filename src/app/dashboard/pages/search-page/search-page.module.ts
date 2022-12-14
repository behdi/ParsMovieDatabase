import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchBarComponent } from './components/search/search-bar.component';
import { SearchPageComponent } from './search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchDetailPageComponent } from './pages/search-detail/search-detail-page.component';
;

@NgModule({
  declarations: [SearchBarComponent, SearchPageComponent, SearchResultComponent, SearchDetailPageComponent],
  imports: [CommonModule, SearchPageRoutingModule, ReactiveFormsModule, InfiniteScrollModule],
})
export class SearchPageModule {}
