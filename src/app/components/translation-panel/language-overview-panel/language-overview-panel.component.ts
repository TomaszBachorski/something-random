import { Component, Input, OnInit } from '@angular/core';
import { extendedLanguageResponse, languageInfoResponse, supportedLanguages } from 'src/app/customTypes';
import { TranslateService } from 'src/app/services/translate-service.service';

@Component({
    selector: 'language-box',
    templateUrl: './language-overview-panel.component.html',
    styleUrls: ['./language-overview-panel.component.css']
})
export class LanguageOverviewPanelComponent implements OnInit {

    @Input() public language: string = "";
    public translatedStrings: number = 0;
    public availableStrings: number = 0;
    public approved: number = 0;
    public numberOfContributors: number = 0;
    public languageName: string = "";

    constructor(
        private translateService: TranslateService
    ) { }

    ngOnInit(): void {
        this.translateService.getSupportedLanguages().subscribe((res: supportedLanguages) => {
            if (!res.languages.includes(this.language)) return;
            this.translateService.getLanguageInformation(this.language).subscribe((res: languageInfoResponse) => {
                this.translatedStrings = res.translatedStrings;
                this.availableStrings = res.availableStrings;
                this.approved = res.approved;
                this.numberOfContributors = res.numberOfContributors;
            });
            this.translateService.getLanguageExtended(this.language).subscribe((res: extendedLanguageResponse)=>{
                this.languageName = res.language;
            });
        });
    }

}
