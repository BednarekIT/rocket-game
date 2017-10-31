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
        <div class="planet" #target [class.hit]="hitCount >= 1" [style.top]="position.y + '%'" [style.left]="position.x + '%'">
            <div class="planet_shadow"></div>
            <div class="crater1"></div>
            <div class="crater2"></div>
            <div class="crater3"></div>
            <div class="crater4"></div>
        </div>
    `
})
export class PlanetComponent implements OnInit {

    @ViewChild('target') target;
    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
    @Output() y: EventEmitter<any> = new EventEmitter<any>();

    armor = 3;
    hitCount = 0;

    tx: any;

    position: any = {
        x: this.getRandomArbitrary(0, 100),
        y: -1
    };

    ngOnInit() {

        this.tx = TweenMax.to(this.target.nativeElement, this.getRandomArbitrary(5, 30), {top: '110%', delay: this.getRandomArbitrary(0, 3), repeat: -1, onUpdate: () =>
        {
            this.checkShot();
            this.y.emit({top: this.target.nativeElement.style.top, left: this.target.nativeElement.style.left});

        }, onRepeat: () => {
            this.position.x = this.getRandomInt(2, 98);
            // this.submitted.emit(true);
        }});

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