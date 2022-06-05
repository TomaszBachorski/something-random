import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import jwt_decode from "jwt-decode";
import { jwtToken } from 'src/app/customTypes';

@Component({
    selector: 'app-translation-panel',
    templateUrl: './translation-panel.component.html',
    styleUrls: ['./translation-panel.component.css']
})
export class TranslationPanelComponent implements OnInit {
    public userLanguages!: string[];

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private router: Router,
        private localStorage: LocalStorageService
    ) { }

    ngOnInit(): void {
        if (!this.localStorage.get("loggedIn") || !this.localStorage.get("jwtToken")) {
            this.router.navigate(["/signin"]);
            this.localStorage.removeAll();
            return;
        }
        this.authService.authenticate(this.localStorage.get("jwtToken")!);
        let decodedToken: jwtToken = jwt_decode(this.localStorage.get("jwtToken")!);
        this.userLanguages = decodedToken.languages;
    }
}
