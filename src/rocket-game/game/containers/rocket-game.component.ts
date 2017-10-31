import {
    AfterContentInit,
    Component,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/timer';


import { StarComponent } from "../components/star/star.component";
import { MoonComponent } from "../components/moon/moon.component";
import { ShotComponent } from "../components/shot/shot.component";
import { TimerComponent } from "../components/timer/timer.component";
import { GameService } from "../shared/service/game/game.service";
import { Subscription } from "rxjs/Subscription";
import { Store } from "../../../store";
import { PlanetComponent } from "../components/planet/planet.component";

@Component({
    selector: 'rocket-game',
    styleUrls: ['./rocket-game.component.scss'],
    template: `
        <div class="container">
            <timer #timer timeInSeconds="20"></timer>
            <game-score-board [score]="score"></game-score-board>
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
export class RocketGameComponent implements OnInit, OnDestroy, AfterContentInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChild('fire', {read: ViewContainerRef}) fire: ViewContainerRef;
    @ViewChild(TimerComponent) timer: TimerComponent;

    games$: Observable<any>;
    subscription: Subscription;

    position: any;
    score: any = {
        shot: 0,
        hit: 0
    };
    windowWidth: any;
    windowHeight: any;
    stars: any = [];
    moons: any = [];
    targets: any = [];
    fires: any = [];

    constructor(private resolver: ComponentFactoryResolver,
                private store: Store,
                private gameService: GameService,) {
        this.games$ = this.store.select('games');
        this.subscription = this.gameService.games$.subscribe(
            data => {
                console.log(data);
            }
        );

    }


    ngAfterContentInit() {
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        // let list = [1,2,3,4];
        for (let i in list) {
            this.createStar(i);
        }

        let listMoons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        for (let i in listMoons) {
            if (parseInt(i) % 2 !== 0) {
                this.createMoon(i);
            } else {
                this.createPlanet(i);
            }
        }


    }

    createStar(id) {
        const starComp = this.resolver.resolveComponentFactory(StarComponent);
        this.stars[id] = this.container.createComponent(starComp);
    }

    createMoon(id) {
        const moonComp = this.resolver.resolveComponentFactory(MoonComponent);
        const comp = this.container.createComponent(moonComp);
        this.targets[id] = comp;
        comp.instance.submitted.subscribe(hit => {
            this.score.hit += 1;
            comp.destroy();
            delete this.targets[id];
        });
    }

    createPlanet(id) {
        const planetComp = this.resolver.resolveComponentFactory(PlanetComponent);
        const comp = this.container.createComponent(planetComp);
        this.targets[id] = comp;
        comp.instance.submitted.subscribe(hit => {
            this.score.hit += 1;
            comp.destroy();
            delete this.targets[id];
        });
    }

    createShot(id) {
        const fireComp = this.resolver.resolveComponentFactory(ShotComponent);
        this.fires[id] = this.fire.createComponent(fireComp);
        this.fires[id].instance.position = this.position;
        this.fires[id].instance.moons = this.moons;
        this.fires[id].instance.targets = this.targets;
        this.fires[id].instance.remove.subscribe(hit => {
            this.fires[id].destroy()
        });


    }

    checkHit(shotPosition) {
        console.log('shot', shotPosition);

        this.moons.map(item => {
            console.log(item.location.nativeElement.offsetLeft);
            console.log('ttt', item.instance.position)
        })
    }

    ngOnInit() {

        setTimeout(() => {
            this.timer.startTimer();
        }, 1000);

        this.timer.finish.subscribe(
            data => {

                this.gameService.addGame({score: this.score, timeInSeconds: data})
            }
        )

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        const leftArrow$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === 'ArrowLeft')
            .mapTo(position => this.decrement(position, 'x', 1));

        const rightArrow$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === 'ArrowRight')
            .mapTo(position => this.increment(position, 'x', 1));

        const downArrow$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === 'ArrowDown')
            .mapTo(position => this.increment(position, 'y', 1));

        const upArrow$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === 'ArrowUp')
            .mapTo(position => this.decrement(position, 'y', 1));

        const spaceShot$ = Observable.fromEvent(document, 'keydown')
            .filter(event => event['key'] === ' ');

        Observable.merge(spaceShot$)
            .subscribe(
                shot => {
                    this.createShot(this.score.shot += 1)
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}