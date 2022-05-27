import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-translation-panel',
    templateUrl: './translation-panel.component.html',
    styleUrls: ['./translation-panel.component.css']
})
export class TranslationPanelComponent implements OnInit {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (!localStorage.getItem("username")) this.router.navigate(["/signin"])
    
    }

}
