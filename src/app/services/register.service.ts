import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../user';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {

    constructor(
        private http: HttpClient
    ) { }

    register(user: User) {
        return this.http.post(`http://localhost:7200/register`, user);
    }
}
