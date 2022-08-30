import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { stringInformation } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';

@Component({
    selector: 'current-translations',
    templateUrl: './current-translations.component.html',
    styleUrls: ['./current-translations.component.css']
})
export class CurrentTranslationsComponent implements OnInit {

    @Input() public language: string = "";
    public stringKey: string = "";
    public stringInformation: stringInformation = {stringExist:true, stringKey:"", stringContent:"", additionalContext:"", availableTranslations:[]};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stringsService: StringsService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            if (!params["stringKey"]) return;
            this.stringKey = params["stringKey"];
            return;
        });
        this.stringsService.getString(this.stringKey, this.language).subscribe((res:stringInformation)=>{
            this.stringInformation = res;
            console.log(this.stringInformation)
            return;
        });
    }
}
