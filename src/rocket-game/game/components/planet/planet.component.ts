import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { TweenMax } from 'gsap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/repeat';

@Component({
    selector: 'game-planet',
    styleUrls: ['./planet.component.scss'],
    template: `
        <div class="planet">
            <div class="planet_shadow"></div>
            <div class="crater1"></div>
            <div class="crater2"></div>
            <div class="crater3"></div>
            <div class="crater4"></div>
        </div>
    `
})
export class PlanetComponent implements OnInit {

    position: any = {
        x: this.getRandomArbitrary(0, 100),
        y: -1
    };

    ngOnInit() {

    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}