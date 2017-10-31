import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './containers/app/app.component';
import { RocketGameModule } from '../rocket-game/rocket-game.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from "../auth/auth.module";
import { Store } from "../store";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


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
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
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