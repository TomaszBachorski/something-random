import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-translation-panel',
    templateUrl: './translation-panel.component.html',
    styleUrls: ['./translation-panel.component.css']
})
export class TranslationPanelComponent implements OnInit {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (!localStorage.getItem("loggedIn")) this.router.navigate(["/signin"]);
    
    }

}
