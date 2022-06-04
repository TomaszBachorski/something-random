import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { emailTaken, loginResponse, registerResponse, supportedLanguages, usernameExists, authenticateResponse } from '../customTypes';
import { LoginUser, RegisterUser } from '../user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage.service';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastrService: ToastrService,
        private localStorage: LocalStorageService
    ) { }

    userExists(username: string) {
        return this.http.post<usernameExists>(`http://localhost:7200/userExists/`, { username: username });
    }

    emailTaken(email: string) {
        return this.http.post<emailTaken>(`http://localhost:7200/emailTaken/`, { email: email });
    }

    register(user: RegisterUser) {
        return this.http.post<registerResponse>(`http://localhost:7200/register`, user);
    }
    private setSession(authResult: loginResponse) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        this.localStorage.set('jwtToken', authResult.jwtToken!);
        this.localStorage.set("expiresAt", JSON.stringify(expiresAt.valueOf()));
    }
    login(user: LoginUser) {
        return this.http.post<loginResponse>(`http://localhost:7200/login`, user).subscribe((res: loginResponse) => {
            if (res.message !== "Success") {
                this.toastrService.error("Invalid credentials", "Error", {
                    messageClass: "message",
                    titleClass: "title"
                });
                return;
            }
            this.setSession(res);
            this.localStorage.set("loggedIn", "true");
            this.router.navigate(['/translate']);
        });
    }

    logout() {
        this.localStorage.removeAll();
        this.router.navigate(["/signin"])
    }

    getSupportedLanguages() {
        return this.http.get<supportedLanguages>("http://localhost:7200/supportedLanguages");
    }

    authenticate(jwtToken: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: jwtToken
            })
        };
        return this.http.get<authenticateResponse>("http://localhost:7200/authenticate", httpOptions).subscribe((res: authenticateResponse) => {
            if (res.valid === true) return;
            //not valid token
            this.localStorage.removeAll();
            this.router.navigate(["/signin"])
        });
    }
}
