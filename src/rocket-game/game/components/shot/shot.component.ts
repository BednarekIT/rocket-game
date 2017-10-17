import {Component, ViewChild, OnInit, Output, EventEmitter, Input, AfterContentInit} from '@angular/core';
import {TweenMax} from 'gsap';

@Component({
    selector: 'app-shot',
    template: `
        <div #shot class="shot" [style.top]="position.y + '%'" [style.left]="position.x+'%'"></div>`,
    styles: [`
        .shot {
            pointer-events: none;
            position: absolute;
            width: 5px;
            height: 10px;
            background: cyan;
            border-radius: 2px;
            transform: translateX(-50%);
        }
    `]
})

export class ShotComponent implements OnInit, AfterContentInit {
    @ViewChild('shot') shot;
    @Output() remove: EventEmitter<any> = new EventEmitter();
    @Output() hit: EventEmitter<any> = new EventEmitter();
    @Input() position: any;
    @Input() moons: any;

    ngOnInit() {


        TweenMax.to(this.shot.nativeElement, 1, {
            top: "-25px", onUpdate: () => {
                this.moons.filter(item => {
                    const moonPos = item.instance.moon.nativeElement.getBoundingClientRect();
                    const shotPos = this.shot.nativeElement.getBoundingClientRect();
                    if (moonPos.left <= shotPos.left && shotPos.right <= moonPos.right) {
                        if (shotPos.top <= moonPos.bottom) {
                            item.instance.hitCount += 1;
                            this.remove.emit();
                            return;
                        }
                    }
                });
        }, onComplete: () => {
                this.remove.emit();
            }
        })


    }

    ngAfterContentInit() {

    }

}