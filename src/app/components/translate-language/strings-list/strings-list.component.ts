import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { stringsList } from 'src/app/customTypes';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StringsService } from 'src/app/services/strings-service.service';

type pta = "pending" | "translated" | "approved"

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
        private localStorage: LocalStorageService,
        private route: ActivatedRoute
        ) { }

    ngOnInit(): void {
        this.stringsService.getStrings(this.language).subscribe((res: stringsList) => {
            this.stringsList = res;
        });

        //loading previously choosen options
        Object.keys(this.statusCheckbox).forEach((key)=>{
            if (this.localStorage.get(key)==="true") this.statusCheckbox[key as pta] = true;
            if (this.localStorage.get(key)==="false") this.statusCheckbox[key as pta] = false;
        });
        
        this.route.queryParams.subscribe((params: Params)=>{
            if (!params["stringKey"]) return;
            let element = document.getElementById(params["stringKey"])
            if (!element) return;
            document.querySelectorAll(".stringBox").forEach((element)=>{
                (element as HTMLElement).style.backgroundColor = "#fff";
                (element as HTMLElement).style.color = "#000";
            });
            element.style.backgroundColor = "#aaa";
            element.style.color = "#fff";
        });
    }

    //saving currently choosen filter options
    @HostListener('window:unload')
    private onUnload(): void {
        Object.keys(this.statusCheckbox).forEach(key=>{
            this.localStorage.set(key, String(this.statusCheckbox[key as pta]));
        })
    }

    change(state: pta): void {
        document.querySelectorAll(`.${state}`).forEach((e)=>{
            this.statusCheckbox[state] = !this.statusCheckbox[state];
            this.localStorage.set(state, this.statusCheckbox[state].toString());
            return e.classList.toggle(`display`);
        });
    }
}
