import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// third-party modules

// shered module
import {HttpModule} from '@angular/http';
import {AuthGuard} from "../auth/shared/guards/auth.guard";


export const ROUTES: Routes = [
    { path: 'rocket-game', canActivate: [AuthGuard], loadChildren: './game/game.module#GameModule' },
    { path: '**', redirectTo: 'rocket-game' }

];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forChild(ROUTES),
    ]
})
export class RocketGameModule {
}