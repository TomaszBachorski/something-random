import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import jwt_decode from "jwt-decode";
import { jwtToken } from 'src/app/customTypes';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/services/title-service.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    public user!: jwtToken;
    
    constructor(
        private localStorage: LocalStorageService,
        private authService: AuthService,
        private router: Router,
        private titleService: TitleService
    ) {}

    ngOnInit(): void {
        if (!this.localStorage.get("loggedIn") || !this.localStorage.get("jwtToken")) {
            this.router.navigate(["/signin"]);
            this.localStorage.removeAll();
            return;
        }
        this.authService.authenticate(this.localStorage.get("jwtToken")!);
        this.titleService.setTitle("Account");
        this.user = jwt_decode(this.localStorage.get("jwtToken")!);
        
    }

}
