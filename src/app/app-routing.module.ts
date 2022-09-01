import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanViewDashboardGuard } from './guards/can-view-dashboard.guard';
import { CanViewLoginGuard } from './guards/can-view-login.guard';

const routes: Routes = [
  {
    path: 'login',
    canLoad: [CanViewLoginGuard],
    loadChildren: () =>
      import('src/app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canLoad: [CanViewDashboardGuard],
    loadChildren: () =>
      import('src/app/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
