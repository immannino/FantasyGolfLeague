import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routes.module';

import { AppComponent } from './app.component';
import { AppMaterialsModule } from './app-materials.module';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PgaTourService } from './lib/pgatour/pgatour.service';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DashboardComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ PgaTourService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
