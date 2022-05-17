import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import User from "../../user";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private httpClient: HttpClient,
        // private user: User 
    ) { };
    ngOnInit(): void {

    }
    registrationForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        languages: new FormControl('', [Validators.required]),
        birthdate: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
        agreement: new FormControl('', [Validators.required])
    })
    validate() {
        console.log(this.registrationForm)
    }
}
