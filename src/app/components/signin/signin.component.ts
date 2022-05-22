import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service.service';
import { LoginUser } from 'src/app/user';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    user!: LoginUser;

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) { }

    ngOnInit(): void {

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
