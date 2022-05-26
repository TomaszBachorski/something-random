import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { UserService } from 'src/app/services/user-service.service';


@Component({
    selector: 'app-translation-panel',
    templateUrl: './translation-panel.component.html',
    styleUrls: ['./translation-panel.component.css']
})
export class TranslationPanelComponent implements OnInit {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        
    }

}
