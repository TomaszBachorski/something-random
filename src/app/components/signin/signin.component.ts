import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service.service';

import { LoginUser } from 'src/app/user';

import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { loginResponse } from 'src/app/customTypes';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    user!: LoginUser;
    @ViewChild(ToastContainerDirective, { static: true })
    toastContainer!: ToastContainerDirective;

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        if (localStorage.getItem("loggedIn")) this.router.navigate(["/translate"]);
        this.toastrService.overlayContainer = this.toastContainer;
        this.toastrService.toastrConfig.disableTimeOut = true;
        this.toastrService.toastrConfig.tapToDismiss = false;
        this.toastrService.toastrConfig.preventDuplicates = true;
        this.route.queryParams.subscribe(p => {
            if (!p["message"]) return;
            if (p["message"] === "Success") {
                this.toastrService.success("You have been registered successfully and now you can log in!", "Success!", {
                    messageClass: "message",
                    titleClass: "title"
                });
            }
            return;
        });
    }
    loginForm = new FormGroup({
        emailOrUsername: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
    });

    validate() {
        if (!this.loginForm.valid) return;
        let user = new LoginUser(this.loginForm.value.emailOrUsername, this.loginForm.value.password);
        this.authService.login(user);
    }
}