import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import User from "../user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    userExists(username: string) {
        return this.http.get(`http://localhost:7200/userExists/${username}`);
    }

    register(user: User) {
        return this.http.post(`http://localhost:7200/register`, user);
    }
}
