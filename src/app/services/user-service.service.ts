import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { RegisterUser, LoginUser } from "../user";

import { emailTaken, loginResponse, registerResponse, supportedLanguages, usernameExists } from "../customTypes"

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
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

    login(user: LoginUser) {
        return this.http.post<loginResponse>(`http://localhost:7200/login`, user);
    }

    getSupportedLanguages() {
        return this.http.get<supportedLanguages>("http://localhost:7200/supportedLanguages")
    }
}
