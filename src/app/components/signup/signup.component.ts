import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from "@angular/common/http";
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
    
}
