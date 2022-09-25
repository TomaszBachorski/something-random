import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtToken, stringInformation } from 'src/app/customTypes';
import { AuthService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TitleService } from 'src/app/services/title-service.service';
import jwt_decode from "jwt-decode";

@Component({
    selector: 'app-translate-language',
    templateUrl: './translate-language.component.html',
    styleUrls: ['./translate-language.component.css']
})
export class TranslateLanguageComponent implements OnInit {

    @Input() public language: string = "";
    public user!: jwtToken | null;
    public stringInformation!: stringInformation;

    constructor(
        private titleService: TitleService,
        private router: Router,
        private localStorage: LocalStorageService,
        private authService: AuthService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        if (!this.localStorage.get("loggedIn") || !this.localStorage.get("jwtToken")) {
            this.router.navigate(["/signin"]);
            this.localStorage.removeAll();
            return;
        }
        const jwtToken: string = this.localStorage.get("jwtToken")!;
        this.authService.authenticate(jwtToken);

        this.authService.refreshUserInformation(jwtToken, this.localStorage.get("expiresAt")!).subscribe((res: {jwtBearerToken: string}) => {
            this.localStorage.set("jwtToken", res.jwtBearerToken);
            const decodedToken: jwtToken = jwt_decode(jwtToken);
            if (!decodedToken.languages.includes(this.language)) this.router.navigate(["/translate"]);
            this.user = decodedToken;
        });
        this.language = this.router.url.split("/")[2].split("?")[0];
        this.titleService.setTitle(`Translating ${this.language}`);
    }

}
