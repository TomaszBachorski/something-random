import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service.service';
import { LoginUser } from 'src/app/user';

import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

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
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.toastrService.overlayContainer = this.toastContainer;
        this.toastrService.toastrConfig.disableTimeOut = true;
        this.toastrService.toastrConfig.tapToDismiss = false;
        this.route.queryParams.subscribe(p=>{
            if (!p["message"]) return;
            if (p["message"]=="Success") {
                this.toastrService.success("You have been registered successfully and now you can log in!","Success!", {
                    messageClass: "message",
                    titleClass: "title"
                });
            }
        });
    }
    loginForm = new FormGroup({
        emailOrUsername: new FormControl("", []),
        password: new FormControl("", [])
    });

    validate() {
        let user = new LoginUser(this.loginForm.value.emailOrUsername, this.loginForm.value.password);
        this.userService.login(user).subscribe(res=>{
            console.log(res)
        });
    }
}
