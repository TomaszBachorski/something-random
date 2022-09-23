import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterUser } from "../../user";
import { emailAlreadyExists, englishAsNative, maxNumberOfLanguages, minimumAge, passwordMatchValidator, supportedLanguages, unexpectedInput, usernameAlreadyExists } from 'src/app/customValidators';
import { AuthService } from 'src/app/services/auth-service.service';
import { TitleService } from 'src/app/services/title-service.service';

export class FormControlWarn extends FormControl {
    warnings: any;
    get warn(): boolean {
      return this.warnings != null;
    }
}
export interface AbstractControlWarn extends AbstractControl { warnings: any; }

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
    private user!: RegisterUser;

    get languages (): FormControlWarn {
        return <FormControlWarn>this.registrationForm.get("languages");
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private titleService: TitleService
    ) { };

    ngOnInit(): void {
        this.registrationForm.setValidators(passwordMatchValidator);
        this.titleService.setTitle("Register");
    }

    registrationForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required, usernameAlreadyExists(this.authService)]),
        languages: new FormControlWarn('', [Validators.required, englishAsNative(), unexpectedInput(), supportedLanguages(this.authService), maxNumberOfLanguages()]),
        birthdate: new FormControl('', [Validators.required, minimumAge()]),
        email: new FormControl('', [Validators.required, Validators.email, emailAlreadyExists(this.authService)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        agreement: new FormControl('', [Validators.requiredTrue])
    });

    validate(): void {
        if (!this.registrationForm.valid) return;
        this.user = new RegisterUser(
            this.registrationForm.value.name,
            this.registrationForm.value.surname,
            this.registrationForm.value.username,
            this.registrationForm.value.languages,
            this.registrationForm.value.birthdate,
            this.registrationForm.value.email,
            this.registrationForm.value.password
        );
        this.authService.register(this.user).subscribe((res:{message: string}) => {
            if (res.message==="Success") return;
            this.router.navigate(['/signin'], { queryParams: {message: "Success"} });
        }, (error) => { console.log(error) });
        return;
    }
    log() {
        console.log(this.registrationForm)
    }
}

