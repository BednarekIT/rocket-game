import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './containers/app/app.component';
import {RocketGameModule} from '../rocket-game/rocket-game.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from "../auth/auth.module";
import {Store} from "../store";


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
        AuthModule,
        RocketGameModule
    ],
    providers: [
        Store
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

/*

 var config = {
    apiKey: "AIzaSyDRzZbudzeCPs7LauQ_u5Qye-iMpwE4-tc",
    authDomain: "rocket-game-811d9.firebaseapp.com",
    databaseURL: "https://rocket-game-811d9.firebaseio.com",
    projectId: "rocket-game-811d9",
    storageBucket: "rocket-game-811d9.appspot.com",
    messagingSenderId: "628504841538"
  };

 */