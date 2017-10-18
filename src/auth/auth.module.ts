import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// third-party modules
import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

// shared modules
import {SharedModule} from './shared/shared.module';

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'login'},
            {path: 'login', loadChildren: './login/login.module#LoginModule'},
            {path: 'register', loadChildren: './register/register.module#RegisterModule'},
        ]
    }
];

export const firebaseConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyDRzZbudzeCPs7LauQ_u5Qye-iMpwE4-tc",
    authDomain: "rocket-game-811d9.firebaseapp.com",
    databaseURL: "https://rocket-game-811d9.firebaseio.com",
    projectId: "rocket-game-811d9",
    storageBucket: "rocket-game-811d9.appspot.com",
    messagingSenderId: "628504841538"
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ]
})
export class AuthModule {
}