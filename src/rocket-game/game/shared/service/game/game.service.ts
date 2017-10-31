import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from "../../../../../auth/shared/services/auth/auth.service";



import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Store} from "../../../../../store";


export interface Game {
    score: any,
    timeInSeconds: any
}

@Injectable()
export class GameService {

    games$: Observable<any> = this.db.list(`score/${this.uid}`).valueChanges()
        .do(next => this.store.set('games', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}

    get uid() {
        return this.authService.user.uid;
    }

    addGame(game: Game) {
        return this.db.list(`score/${this.uid}`).push(game);
    }

}