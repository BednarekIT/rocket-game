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
import {TimerComponent} from "./components/timer/timer.component";
import {GameService} from "./shared/service/game/game.service";
import { SharedModule } from './shared/shared.module';


export const ROUTES: Routes = [
    { path: '', component: RocketGameComponent }

];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ],
    declarations: [
        RocketGameComponent,
        StarComponent,
        PlanetComponent,
        MoonComponent,
        ShotComponent,
        ScoreBoardComponent,
        TimerComponent
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