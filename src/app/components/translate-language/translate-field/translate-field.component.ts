import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringInformation, translation } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
    selector: 'translate-field',
    templateUrl: './translate-field.component.html',
    styleUrls: ['./translate-field.component.css']
})
export class TranslateFieldComponent implements OnInit {

    @Input() public language: string = "";
    @Input() public userId: number = 0;
    public selectedString: boolean = false;
    public stringInformation: stringInformation | undefined;
    public userTranslation: translation | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stringsService: StringsService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (!params["stringKey"]) return this.selectedString = false;
            this.stringsService.getString(params["stringKey"], this.language).subscribe((res: stringInformation) => {
                if (res.stringExist === false) return this.router.navigate(["/translate"]);
                this.stringInformation = res;
                this.userTranslation = this.stringInformation.availableTranslations?.find(t => t.userId === this.userId)
                return
            });
            return;
        });
    }

}
