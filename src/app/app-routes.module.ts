import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

const appRoutes: Routes = [
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'leaderboard', pathMatch: 'full' },
            { path: '**', redirectTo: 'leaderboard', pathMatch: 'full' },
            { path: 'leaderboard', component: LeaderboardComponent }
        ]
    },
    { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: DashboardComponent }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}