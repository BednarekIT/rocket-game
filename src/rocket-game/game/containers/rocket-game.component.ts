import {
    AfterContentInit, AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {IScheduler} from 'rxjs/Scheduler';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/merge';


import { StarComponent } from "../components/star/star.component";
import { MoonComponent } from "../components/moon/moon.component";
import { ShotComponent } from "../components/shot/shot.component";

@Component({
    selector: 'rocket-game',
    styleUrls: ['./rocket-game.component.scss'],
    template: `        
        <div class="container">
            <!--<div class="test" style="position: absolute; color: #fff;" [style.left]="backgroundPosition + 'px'">a</div>-->
            <div #container></div>
            <div #fire></div>
            <div class="rocket" [style.top]="position.y + '%'" [style.left]="position.x + '%'">
                
                <div class="rocket-body">
                    <div class="body"></div>
                    <div class="fin fin-left"></div>
                    <div class="fin fin-right"></div>
                    <div class="window"></div>
                </div>
                <div class="exhaust-flame"></div>
            </div>
        </div>
    `
})
export class RocketGameComponent implements OnInit, AfterContentInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChild('fire', {read: ViewContainerRef}) fire: ViewContainerRef;

    position: any;
    // starCount = Array(10).fill(4);
    backgroundPosition: number = 0;
    shotCount = 0;
    windowWidth: any;
    windowHeight: any;
    stars: any = [];
    moons: any = [];
    fires: any = [];

    constructor(
        private resolver: ComponentFactoryResolver
    ) {

    }

    ngAfterContentInit() {
        let list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // let list = [1,2,3,4];
        for (let i in list) {
            this.createStar(i);
        }

        let listMoons = [1,2,3,4,5,6,7,8];
        for(let i in listMoons) {
            this.createMoon(i);
        }

    }

    createStar(id) {
        const starComp = this.resolver.resolveComponentFactory(StarComponent);
        this.stars[id] = this.container.createComponent(starComp);
    }

    createMoon(id) {
        const moonComp = this.resolver.resolveComponentFactory(MoonComponent);
        const comp = this.container.createComponent(moonComp);
        this.moons[id] = comp;
        comp.instance.submitted.subscribe(hit => {
            comp.destroy();
            delete this.moons[id];
        });
        comp.instance.y.subscribe(data => {
            if (parseInt(data.top) >= this.position.y) {
                if (this.position.x > parseInt(data.left)-5 && this.position.x < parseInt(data.left)+5) {
                    // comp.destroy();
                    // delete this.moons[id];
                }
            }
        });

    }

    createShot(id) {
        const fireComp = this.resolver.resolveComponentFactory(ShotComponent);
        this.fires[id] = this.fire.createComponent(fireComp);
        this.fires[id].instance.position = this.position;
        this.fires[id].instance.moons = this.moons;
        this.fires[id].instance.remove.subscribe(hit => this.fires[id].destroy());
    }

    checkHit(shotPosition) {
        console.log('shot', shotPosition);

        this.moons.map(item => {
            console.log(item.location.nativeElement.offsetLeft);
            console.log('ttt',   item.instance.position)
        })
    }

    ngOnInit() {

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        const leftArrow$ = Observable.fromEvent(document, 'keydown')
            .filter(event =>  event['key'] === 'ArrowLeft' )
            .mapTo(position => this.decrement(position, 'x', 2));

        const rightArrow$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === 'ArrowRight')
            .mapTo(position => this.increment(position, 'x', 2));

        const downArrow$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === 'ArrowDown')
            .mapTo(position => this.increment(position, 'y', 2));

        const upArrow$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === 'ArrowUp')
            .mapTo(position => this.decrement(position, 'y', 2));

        const spaceShot$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === ' ');

        Observable.merge(spaceShot$)
            .subscribe(
                shot => {
                    this.createShot(this.shotCount += 1)
                }
            );

        Observable.merge(leftArrow$, rightArrow$, downArrow$, upArrow$)
            .startWith(<any>{x: 50, y: 86})
            .scan((acc, curr) => curr(acc))
            .subscribe(position => this.position = position)

        // Observable
        //     .interval(1000)
        //     .startWith(100)
        //     .take(10)
        //     .repeat()
        //     .subscribe(count => this.backgroundPosition = count);
    }

    shot(id) {
        console.log(id);
    }
    increment(obj, prop, value) {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        if (prop === 'x') {
            if (obj.x >= 95) return obj;
        } else {
            if (obj.y >= 95) return obj;
        }
        return Object.assign({}, obj, {[prop]: obj[prop] + value})
    }

    decrement(obj, prop, value) {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        if (prop === 'y') {
            if (obj.y <= 0) return obj;
        } else {
            if (obj.x <= -2) return obj;
        }
        return Object.assign({}, obj, {[prop]: obj[prop] - value})
    }


}