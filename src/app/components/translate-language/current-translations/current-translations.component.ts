import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { multipleUsersArray, rolesEnum, stringInformation } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';
import { UsersPanelService } from 'src/app/services/users-panel-service.service';

@Component({
    selector: 'current-translations',
    templateUrl: './current-translations.component.html',
    styleUrls: ['./current-translations.component.css']
})
export class CurrentTranslationsComponent implements OnInit {

    @Input() public language: string = "";
    public stringKey: string = "";
    public stringInformation: stringInformation = { stringExist: false, stringKey: "", stringContent: "", additionalContext: "", availableTranslations: [] };
    public participatingUsers: multipleUsersArray = []
    public displayData: Array<{ id: number, translation: string, approved: boolean, username: string, rankId: string }> = []

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
                if (!this.stringInformation.availableTranslations) return;
                let uids: number[] = this.stringInformation.availableTranslations.map(u => u.userId);
                this.userService.getMultipleUsers(uids).subscribe((res: multipleUsersArray) => {
                    this.displayData = [];
                    this.participatingUsers = res;
                    if (!this.stringInformation.availableTranslations) return;
                    for (let i = 0; i < this.stringInformation.availableTranslations.length; i++) {
                        let user = this.stringInformation.availableTranslations[i];
                        this.displayData.push({
                            id: user.userId,
                            translation: user.translation,
                            approved: user.approved,
                            username: res.find(u => u.id === user.userId)!.username,
                            rankId: rolesEnum[res.find(u => u.id === user.userId)!.rankId]
                        });
                    }
                });
            });
            return;
        });
    }
}
