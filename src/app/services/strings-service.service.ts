import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringsList } from '../customTypes';

@Injectable({
    providedIn: 'root'
})
export class StringsService {

    constructor(
        private http: HttpClient
    ) { }

    getStrings(language: string) {
        return this.http.post<stringsList>("http://localhost:7200/getStrings", {language: language});
    }
}
