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
import { AddTeamComponent, AddTeamDialogTemplate } from './components/add-team-modal/add-team.component';
import { FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamComponent } from './components/teams/teams.component';
import { TeamCardComponent } from './components/team-card/team-card.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DashboardComponent,
    LeaderboardComponent,
    AddTeamComponent,
    AddTeamDialogTemplate,
    TeamComponent,
    TeamCardComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ AddTeamDialogTemplate],
  providers: [ PgaTourService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
