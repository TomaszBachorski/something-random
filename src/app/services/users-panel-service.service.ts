import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersList } from '../customTypes';

@Injectable({
    providedIn: 'root'
})
export class UsersPanelService {

    constructor(
        private http: HttpClient
    ) { }

    getUsers() {
        return this.http.get<usersList>("http://localhost:7200/getUsers");
    }
}
