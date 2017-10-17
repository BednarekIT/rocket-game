import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// third-party modules

// shered module
import {HttpModule} from '@angular/http';
import {ShotComponent} from './components/shot/shot.component';
import {MoonComponent} from './components/moon/moon.component';
import {PlanetComponent} from './components/planet/planet.component';
import {StarComponent} from './components/star/star.component';
import {RocketGameComponent} from './containers/rocket-game.component';
import {ScoreBoardComponent} from "./components/score-board/score-board.component";


export const ROUTES: Routes = [
    { path: '', component: RocketGameComponent }

];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [
        RocketGameComponent,
        StarComponent,
        PlanetComponent,
        MoonComponent,
        ShotComponent,
        ScoreBoardComponent
    ],
    entryComponents: [
        StarComponent,
        PlanetComponent,
        MoonComponent,
        ShotComponent
    ]
})
export class GameModule {
}