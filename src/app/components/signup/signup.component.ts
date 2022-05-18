import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import User from "../../user";
import { englishAsNative, minimumAge, passwordMatchValidator } from 'src/app/customValidators';
import { RegisterService } from '../../services/register.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
    private user!: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        public httpClient: HttpClient,
        private registerService: RegisterService
    ) { };

    ngOnInit(): void {
        this.registrationForm.setValidators(passwordMatchValidator);
    }
    
    registrationForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        languages: new FormControl('', [Validators.required, englishAsNative()]),
        birthdate: new FormControl('', [Validators.required, minimumAge()]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
        agreement: new FormControl('', [Validators.requiredTrue])
    });

    validate(): void {
        if (!this.registrationForm.valid) return
        this.user = new User(
            this.registrationForm.value.name,
            this.registrationForm.value.surname,
            this.registrationForm.value.username,
            this.registrationForm.value.languages,
            this.registrationForm.value.birthdate,
            this.registrationForm.value.email,
            this.registrationForm.value.password
        );
        console.log(this.user);
        this.registerService.register(this.user);
        this.router.navigate(['../signin'], { relativeTo: this.route });
        return;
    }
    log() {
        console.log(this.registrationForm)
    }
}

