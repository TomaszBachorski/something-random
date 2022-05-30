import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { emailTaken, loginResponse, registerResponse, supportedLanguages, usernameExists } from '../customTypes';
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
        return this.http.get<usernameExists>(`http://localhost:7200/userExists/${username}`);
    }

    emailTaken(email: string) {
        return this.http.get<emailTaken>(`http://localhost:7200/emailTaken/${email}`);
    }

    register(user: RegisterUser) {
        return this.http.post<registerResponse>(`http://localhost:7200/register`, user);
    }
    private setSession(authResult: loginResponse) {
        const expiresAt = moment().add(authResult.expiresIn,'second');
        this.localStorage.set('jwtToken', authResult.jwtToken!);
        this.localStorage.set("expiresAt", JSON.stringify(expiresAt.valueOf()));
        // this.http.post("http://localhost:7200/authenticate", {jwtToken: this.localStorage.get("jwtToken")}).subscribe(res=>{
        //     console.log(res);
        // })
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
            this.localStorage.set("username", res.username!);
            this.localStorage.set("loggedIn", "true");
            this.router.navigate(['/translate']);
        });
    }

    logout () {
        this.localStorage.removeAll();
        this.router.navigate(["/signin"])
    }

    getSupportedLanguages() {
        return this.http.get<supportedLanguages>("http://localhost:7200/supportedLanguages")
    }
}
