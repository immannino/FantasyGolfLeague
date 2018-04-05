import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppMaterialsModule } from './app-materials.module';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PgaTourService } from './lib/pgatour/pgatour.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialsModule,
    HttpClientModule
  ],
  providers: [ PgaTourService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
