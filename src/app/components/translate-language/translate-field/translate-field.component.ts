import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringInformation } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';

@Component({
    selector: 'translate-field',
    templateUrl: './translate-field.component.html',
    styleUrls: ['./translate-field.component.css']
})
export class TranslateFieldComponent implements OnInit {

    @Input() public language: string = "";
    public selectedString: boolean = false;
    public stringInformation: stringInformation | undefined;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stringsService: StringsService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (!params["stringKey"]) return this.selectedString = false;
            console.log(params["stringKey"])
            this.stringsService.getString(params["stringKey"], this.language).subscribe((res: stringInformation) => {
                console.log(res);
                if (res.stringExist === false) return this.router.navigate(["/translate"]);
                this.stringInformation = res;
                return
            });
            return;
        });
    }

}
