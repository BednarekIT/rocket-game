import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
    selector: 'login',
    styleUrls: ['login.component.scss'],
    template: `
        <div class="wrapper">
            <h1 class="title">Rocket<span>Game</span></h1>
            <auth-form (submitted)="loginUser($event)">
                <h1>Login</h1>
                <a routerLink="/auth/register">Not registered?</a>
                <button type="submit">
                    Login
                </button>
                <div class="error" *ngIf="error">
                    {{ error }}
                </div>
            </auth-form>
        </div>
        <game-star *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"></game-star>
    `
})
export class LoginComponent {

    error: string;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    async loginUser(event: FormGroup) {
        const {email, password} = event.value;
        try {
            await this.authService.loginUser(email, password);
            this.router.navigate(['/']);
        } catch (err) {
            this.error = err.message;
        }
    }
}