import {Component, ViewChild, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
import { TweenMax } from 'gsap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/repeat';

@Component({
    selector: 'game-moon',
    styleUrls: ['./moon.component.scss'],
    template: `
        <div class="moon" #moon [class.hit]="hitCount >= 1" [style.top]="position.y + '%'" [style.left]="position.x + '%'">
            <div class="crater2 moon_crater"></div>
            <div class="crater3 moon_crater"></div>
        </div>
    `
})
export class MoonComponent implements OnInit, OnChanges {

    @ViewChild('moon') moon;
    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
    @Output() y: EventEmitter<any> = new EventEmitter<any>();
    position: any = {
        x: this.getRandomArbitrary(2, 98),
        y: -100
    };
    armor = 2;
    hitCount = 0;

    tx: any;

    ngOnInit() {

        this.tx = TweenMax.to(this.moon.nativeElement, 20, {top: '110%', delay: this.getRandomArbitrary(0, 3), repeat: -1, onUpdate: () =>
        {
            this.checkShot();
            this.y.emit({top: this.moon.nativeElement.style.top, left: this.moon.nativeElement.style.left});

        }, onRepeat: () => {
            this.position.x = this.getRandomInt(2, 98);
            // this.submitted.emit(true);
        }});
    }

    ngOnChanges(value) {
        console.log(value);
    }

    checkShot() {
        if(this.hitCount >= this.armor)  {
            this.tx.kill();
            this.submitted.emit(true);

        }
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

