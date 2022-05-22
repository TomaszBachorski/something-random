import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { RegisterUser } from "../../user";
import { englishAsNative, minimumAge, passwordMatchValidator } from 'src/app/customValidators';
import { UserService } from '../../services/user-service.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
    private user!: RegisterUser;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private httpClient: HttpClient,
        private userService: UserService
    ) { };

    ngOnInit(): void {
        this.registrationForm.setValidators(passwordMatchValidator);
    }

    registrationForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required, this.usernameAlreadyExists()]),
        languages: new FormControl('', [Validators.required, englishAsNative()]),
        birthdate: new FormControl('', [Validators.required, minimumAge()]),
        email: new FormControl('', [Validators.required, Validators.email, this.emailAlreadyExists()]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
        agreement: new FormControl('', [Validators.requiredTrue])
    });

    validate(): void {
        if (!this.registrationForm.valid) return
        this.user = new RegisterUser(
            this.registrationForm.value.name,
            this.registrationForm.value.surname,
            this.registrationForm.value.username,
            this.registrationForm.value.languages,
            this.registrationForm.value.birthdate,
            this.registrationForm.value.email,
            this.registrationForm.value.password
        );
        this.userService.register(this.user).subscribe((res) => {
            console.log(res)
            //do something
        }, (error) => {
            console.log(error)
        });
        // this.router.navigate(['../signin'], { relativeTo: this.route });
        return;
    }
    usernameAlreadyExists(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            this.userService.userExists(control.value).subscribe(res=>{
                if (Object.values(res)[0]==true) control.setErrors({usernameExist: true});
            })
            return null;
        }
    }
    emailAlreadyExists(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            this.userService.emailTaken(control.value).subscribe(res=>{
                console.log(control.value, res)
                if (Object.values(res)[0]==true) control.setErrors({emailTaken: true});
            })
            return null;
        }
    }
    log(): void {
        console.log(this.registrationForm)
    }
}

