import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      {
        path: 'search',
        loadChildren: () =>
          import('./pages/search-page/search-page.module').then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/welcome-page/welcome-page.module').then(
            (m) => m.WelcomePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
