import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'language-box',
    templateUrl: './language-overview-panel.component.html',
    styleUrls: ['./language-overview-panel.component.css']
})
export class LanguageOverviewPanelComponent implements OnInit {

    @Input() public language: string = "";

    constructor() { }

    ngOnInit(): void {
    }

}
