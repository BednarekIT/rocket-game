import {Component, ViewChild, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { TweenMax } from 'gsap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/repeat';

@Component({
    selector: 'game-score-board',
    styleUrls: ['./score-board.component.scss'],
    template: `
        <div class="scoreboard">
            <div>Score: {{score.hit}}</div>
            <div>Shots: {{score.shot}}</div>
        </div>
    `
})
export class ScoreBoardComponent implements OnInit {

    @Input() score: any;

    ngOnInit() {
        console.log('ScoreBoard Loaded!')
     }

}