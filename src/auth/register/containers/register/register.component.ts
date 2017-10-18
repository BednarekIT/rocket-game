import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
    selector: 'register',
    styleUrls: ['register.component.scss'],
    template: `
        <div>
            <h1 class="title">Rocket<span>Game</span></h1>
            <auth-form (submitted)="registerUser($event)">
                <h1>Register</h1>
                <a routerLink="/auth/login">Already have an account?</a>
                <button type="submit">
                    Create account
                </button>
                <div class="error" *ngIf="error">
                    {{ error }}
                </div>
            </auth-form>
        </div>
        <game-star *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"></game-star>
    `
})
export class RegisterComponent {

    error: string;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    async registerUser(event: FormGroup) {
        const {email, password} = event.value;
        try {
            await this.authService.createUser(email, password);
            this.router.navigate(['/']);
        } catch (err) {
            this.error = err.message;
        }
    }
}