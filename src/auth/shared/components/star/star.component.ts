import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { TweenMax } from 'gsap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/repeat';

@Component({
    selector: 'game-star',
    styleUrls: ['./star.component.scss'],
    template: `        
        <div class="star" #star [style.top]="position.y + '%'" [style.left]="position.x + '%'"></div>
    `
})
export class StarComponent implements OnInit {
    @ViewChild('star') star;

    position: any = {
        x: this.getRandomArbitrary(0, 100),
        y: -1
    };

    ngOnInit() {
        let tx = TweenMax.to(this.star.nativeElement, 4, {top: '110%', delay: this.getRandomArbitrary(0, 3), repeat: -1});
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}