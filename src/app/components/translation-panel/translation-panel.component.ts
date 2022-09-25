import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import jwt_decode from "jwt-decode";
import { jwtToken, supportedLanguages } from 'src/app/customTypes';
import { TranslateService } from 'src/app/services/translate-service.service';
import { TitleService } from 'src/app/services/title-service.service';

@Component({
    selector: 'app-translation-panel',
    templateUrl: './translation-panel.component.html',
    styleUrls: ['./translation-panel.component.css']
})
export class TranslationPanelComponent implements OnInit {
    public userLanguages!: string[];
    public availableUserLanguages: string[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private localStorage: LocalStorageService,
        private translateService: TranslateService,
        private titleService: TitleService
    ) { }

    ngOnInit(): void {
        if (!this.localStorage.get("loggedIn") || !this.localStorage.get("jwtToken")) {
            this.router.navigate(["/signin"]);
            this.localStorage.removeAll();
            return;
        }
        this.titleService.setTitle("Translate");
        const token: string | null = this.localStorage.get("jwtToken")
        if (!token) return;
        this.authService.authenticate(token); //Further away token is valid!
        this.authService.refreshUserInformation(token, this.localStorage.get("expiresAt")!).subscribe((res: {jwtBearerToken: string}) => {
            this.localStorage.set("jwtToken", res.jwtBearerToken);
            const decodedToken: jwtToken = jwt_decode(token!);
            this.userLanguages = decodedToken.languages;
            this.translateService.getSupportedLanguages().subscribe((res: supportedLanguages) => {
                //Checking which languages are available => not every language is supported
                for (let i = 0; i < this.userLanguages.length; i++) {
                    if (res.languages.includes(this.userLanguages[i])) this.availableUserLanguages.push(this.userLanguages[i]);
                }
            });
        });
    }
}
