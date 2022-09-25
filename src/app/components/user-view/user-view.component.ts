import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        const userId = this.router.url.split("/")[2];
        console.log(userId)
    }

}
