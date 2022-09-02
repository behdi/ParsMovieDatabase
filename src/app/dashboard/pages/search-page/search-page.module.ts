import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './search-page.component';


@NgModule({
  declarations: [
    SearchComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    SearchPageRoutingModule
  ]
})
export class SearchPageModule { }
