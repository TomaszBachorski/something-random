import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/services/title-service.service';

@Component({
    selector: 'app-translate-language',
    templateUrl: './translate-language.component.html',
    styleUrls: ['./translate-language.component.css']
})
export class TranslateLanguageComponent implements OnInit {

    constructor(
        private titleService: TitleService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(`Translating ${this.router.url.split("/")[2]}`)
    }

}
