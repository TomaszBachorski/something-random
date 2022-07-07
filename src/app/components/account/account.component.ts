import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import jwt_decode from "jwt-decode";
import { fullUserInformation, jwtToken, rolesEnum } from 'src/app/customTypes';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/services/title-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlWarn } from '../register/register.component';
import { englishAsNative, maxNumberOfLanguages, supportedLanguages, unexpectedInput } from 'src/app/customValidators';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    public user!: fullUserInformation;
    public rolesEnum: typeof rolesEnum = rolesEnum;

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
        let jwtToken: string = this.localStorage.get("jwtToken")!
        this.authService.authenticate(jwtToken);
        // get user information
        let tempUser:jwtToken = jwt_decode(jwtToken);
        this.authService.getFullUserInformation(tempUser.username).subscribe((res:fullUserInformation)=>{
            this.user = res;
            //set current languages in FormControl
            this.changeLanguageForm.controls["languages"].setValue(this.user.languages.join(","));
        });
        this.titleService.setTitle("Account");
    }
    
    changeLanguageForm = new FormGroup({
        languages: new FormControlWarn("", [Validators.required, englishAsNative(), unexpectedInput(), supportedLanguages(this.authService), maxNumberOfLanguages()])
    })

    get languages (): FormControlWarn {
        return <FormControlWarn>this.changeLanguageForm.get("languages");
    }

    saveLanguages() {
        if (this.languages.touched===false) return;
        if (!this.changeLanguageForm.valid) return;
        console.log(this.user)
    }

}
