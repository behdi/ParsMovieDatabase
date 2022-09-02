import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [SearchComponent, SearchPageComponent],
  imports: [CommonModule, SearchPageRoutingModule, ReactiveFormsModule, InfiniteScrollModule],
})
export class SearchPageModule {}
