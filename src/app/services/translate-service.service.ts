import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { languageInfoResponse, supportedLanguages } from '../customTypes';

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    constructor(
        private http: HttpClient
    ) { }

    getLanguageInformation (language: string) {
        return this.http.post<languageInfoResponse>("http://localhost:7200/languageInformation", {language: language});
    }
    
    getSupportedLanguages() {
        return this.http.get<supportedLanguages>("http://localhost:7200/supportedLanguages");
    }
}
