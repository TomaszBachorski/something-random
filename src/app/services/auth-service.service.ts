import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { emailTaken, loginResponse, registerResponse, supportedLanguages, usernameExists } from '../customTypes';
import { LoginUser, RegisterUser } from '../user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loggedIn: boolean = false;
    username?: string;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    userExists(username: string) {
        return this.http.get<usernameExists>(`http://localhost:7200/userExists/${username}`);
    }

    emailTaken(email: string) {
        return this.http.get<emailTaken>(`http://localhost:7200/emailTaken/${email}`);
    }

    register(user: RegisterUser) {
        return this.http.post<registerResponse>(`http://localhost:7200/register`, user).subscribe((res:registerResponse) => {
            if (Object.values(res)[0]!=="Success") return;
            this.router.navigate(['/signin'], { queryParams: {message: "Success"} });
        }, (error) => { console.log(error) });
    }

    login(user: LoginUser) {
        return this.http.post<loginResponse>(`http://localhost:7200/login`, user).subscribe((res: loginResponse) => {
            console.log(res)
            if (res.message !== "Success") {
                //show message
                return;
            }
            localStorage.setItem("username", res.username!);
            localStorage.setItem("loggedIn", "true");
            this.router.navigate(['/translate']);
        });
    }

    logout () {
        localStorage.removeItem("username");
        localStorage.removeItem("loggedIn");
        this.router.navigate(["/signin"])
    }

    getSupportedLanguages() {
        return this.http.get<supportedLanguages>("http://localhost:7200/supportedLanguages")
    }
}
