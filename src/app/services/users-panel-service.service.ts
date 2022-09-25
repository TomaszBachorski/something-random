import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersList } from '../customTypes';

@Injectable({
    providedIn: 'root'
})
export class UsersPanelService {

    constructor(
        private http: HttpClient
    ) { }

    getUsers(language?: string) {
        return this.http.post<usersList>("http://localhost:7200/getUsers", {language: language});
    }
    getSingleUser(id: number) {
        return this.http.post<usersList>("http://localhost:7200/getSingleUser", {userId: id});
    }
    getMultipleUsers(ids: number[]) {
        return this.http.post<usersList>("http://localhost:7200/getMultipleUsers", {userIds: ids});
    }
}
