import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from 'src/app/services/title-service.service';

@Component({
    selector: 'app-translate-language',
    templateUrl: './translate-language.component.html',
    styleUrls: ['./translate-language.component.css']
})
export class TranslateLanguageComponent implements OnInit {

    @Input() public language: string = "";

    constructor(
        private titleService: TitleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.language = this.router.url.split("/")[2].split("?")[0];
        this.titleService.setTitle(`Translating ${this.language}`);
        this.route.queryParams.subscribe(params=>{ 
            console.log(params)
        })
    }

}
