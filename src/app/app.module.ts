import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './containers/app/app.component';
import {RocketGameModule} from '../rocket-game/rocket-game.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';


export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(ROUTES),
      RocketGameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
