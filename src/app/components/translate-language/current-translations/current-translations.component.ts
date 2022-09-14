import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { rolesEnum, stringInformation } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';
import { UsersPanelService } from 'src/app/services/users-panel-service.service';

@Component({
    selector: 'current-translations',
    templateUrl: './current-translations.component.html',
    styleUrls: ['./current-translations.component.css']
})
export class CurrentTranslationsComponent implements OnInit, OnChanges {

    @Input() public language: string = "";
    public stringKey: string = "";
    public stringInformation: stringInformation = { stringExist: false, stringKey: "", stringContent: "", additionalContext: "", availableTranslations: [] };
    public participatingUsers: { id: number, username: string, rankId: rolesEnum }[] = []
    public displayData: Array<{id: number, translation: string, approved: boolean, username: string, rankId: string}> = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stringsService: StringsService,
        private userService: UsersPanelService
    ) { }

    ngOnInit(): void {
        //its kinda big indent
        this.route.queryParams.subscribe((params: Params) => {
            if (!params["stringKey"]) return;
            this.stringKey = params["stringKey"];
            this.stringsService.getString(this.stringKey, this.language).subscribe((stringInformation: stringInformation) => {
                this.stringInformation = stringInformation;
                let uids: number[] = this.stringInformation.availableTranslations?.map(u => u.userId) || [];
                this.userService.getMultipleUsers(uids).subscribe(res => {
                    this.participatingUsers = res;
                    for (let i = 0 ;i<(this.stringInformation.availableTranslations?.length || 0);i++) {
                        if (!this.stringInformation.availableTranslations) break;
                        this.displayData.push({
                            id: this.stringInformation.availableTranslations[i].userId,
                            translation: this.stringInformation.availableTranslations[i].translation,
                            approved: this.stringInformation.availableTranslations[i].approved,
                            username: res.find(u=>u.id===this.stringInformation.availableTranslations![i].userId)!.username,
                            rankId: rolesEnum[res.find(u=>u.id===this.stringInformation.availableTranslations![i].userId)!.rankId]
                        });
                    }
                });
            });
            return;
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.stringKey === '') return;
        this.stringsService.getString(this.stringKey, this.language).subscribe((stringInformation: stringInformation) => {
            this.stringInformation = this.stringInformation;
        });
    }
}
