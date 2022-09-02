import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    WelcomePageComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
