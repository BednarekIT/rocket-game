import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
    selector: 'timer',
    styleUrls: ['./timer.component.scss'],
    templateUrl: './timer.component.html'
})
export class TimerComponent {

    @Input() timeInSeconds: number;
    @Output() finish: EventEmitter<any> = new EventEmitter();
    public timer: ITimer;

    constructor() {
    }

    ngOnInit() {
        this.initTimer();
    }

    hasFinished() {
        return this.timer.hasFinished;
    }

    initTimer() {
        if(!this.timeInSeconds) { this.timeInSeconds = 0; }

        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }

    startTimer() {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick();
    }

    pauseTimer() {
        this.timer.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }

    timerTick() {
        setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.secondsRemaining--;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if (this.timer.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.timer.hasFinished = true;
                this.finish.emit(this.timeInSeconds);
            }
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }

}

export interface ITimer {
    seconds: number;
    secondsRemaining: number;
    runTimer: boolean;
    hasStarted: boolean;
    hasFinished: boolean;
    displayTime: string;
}