import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { stringsList } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';

@Component({
    selector: 'strings-list',
    templateUrl: './strings-list.component.html',
    styleUrls: ['./strings-list.component.css']
})
export class StringsListComponent implements OnInit, AfterViewChecked {

    public stringsList!: stringsList;
    @Input() public language: string = "";

    constructor(
        private stringsService: StringsService
    ) { }

    ngOnInit(): void {
        this.stringsService.getStrings(this.language).subscribe((res: stringsList) => {
            this.stringsList = res;
        });
    }
    
    ngAfterViewChecked() {
        document.querySelectorAll("input[type=checkbox]").forEach((checkbox)=>{
            if (checkbox.getAttribute("checked")!=="true") return;
            console.log(1)
            document.querySelectorAll(`.${checkbox.id.split("Checkbox")[0]}`).forEach(e=>{
                console.log(e)
                e.classList.remove("display");
            }) 
        })
    }

    change(state: string): void {
        document.querySelectorAll(`.${state}`).forEach((e)=>{
            if (e.classList.contains(`display`)) return e.classList.remove(`display`)
            e.classList.add(`display`)
        });
    }
}
