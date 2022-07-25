import { Component, HostListener, Input, OnInit } from '@angular/core';
import { stringsList } from 'src/app/customTypes';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
        private stringsService: StringsService,
        private localStorage: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.stringsService.getStrings(this.language).subscribe((res: stringsList) => {
            this.stringsList = res;
        });

        //loading previously saved options

        Object.keys(this.statusCheckbox).forEach((key)=>{
            if (this.localStorage.get(key)==="true") this.statusCheckbox[key as "pending" | "translated" | "approved"] = true;
            if (this.localStorage.get(key)==="false") this.statusCheckbox[key as "pending" | "translated" | "approved"] = false;
        })
    }

    //saving currently choosen filter options
    @HostListener('window:unload')
    private onUnload(): void {
        Object.keys(this.statusCheckbox).forEach(key=>{
            this.localStorage.set(key, String(this.statusCheckbox[key as "pending" | "translated" | "approved"]))
        })
    }

    change(state: "pending" | "translated" | "approved"): void {
        document.querySelectorAll(`.${state}`).forEach((e)=>{
            this.statusCheckbox[state] = !this.statusCheckbox[state];
            return e.classList.toggle(`display`)
        });
    }
}
