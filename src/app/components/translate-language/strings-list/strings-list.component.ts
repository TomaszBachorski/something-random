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
    @Input() public language: string="";
    
    constructor(
        private stringsService: StringsService
    ) { }

    ngOnInit(): void {
        this.stringsService.getStrings().subscribe((res: stringsList) => {
            this.stringsList = res;
            console.log(this.language)
        });
    }
}
