import { Component, Input, OnInit } from '@angular/core';
import { stringsList } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';

@Component({
    selector: 'strings-list',
    templateUrl: './strings-list.component.html',
    styleUrls: ['./strings-list.component.css']
})
export class StringsListComponent implements OnInit {

    public stringsList!: stringsList;
    @Input() public language: string = "";

    public statusCheckbox = {
        "pending": true,
        "translated": false,
        "approved": false
    };

    constructor(
        private stringsService: StringsService
    ) { }

    ngOnInit(): void {
        this.stringsService.getStrings(this.language).subscribe((res: stringsList) => {
            this.stringsList = res;
        });
    }

    change(state: "pending" | "translated" | "approved"): void {
        document.querySelectorAll(`.${state}`).forEach((e)=>{
            this.statusCheckbox[state] = !this.statusCheckbox[state];
            console.log(this.statusCheckbox)
            return e.classList.toggle(`display`)
        });
    }
}
