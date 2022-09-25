import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { rolesEnum, usersList } from 'src/app/customTypes';
import { AuthService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TitleService } from 'src/app/services/title-service.service';
import { UsersPanelService } from 'src/app/services/users-panel-service.service';

@Component({
    selector: 'app-users-panel',
    templateUrl: './users-panel.component.html',
    styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

    public users!: usersList;
    public ranks = rolesEnum;

    constructor(
        private authService: AuthService,
        private usersService: UsersPanelService,
        private localStorage: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: TitleService
    ) { }

    ngOnInit(): void {
        if (!this.localStorage.get("loggedIn") || !this.localStorage.get("jwtToken")) {
            this.router.navigate(["/signin"]);
            this.localStorage.removeAll();
            return;
        }
        this.authService.authenticate(this.localStorage.get("jwtToken")!);
        this.usersService.getUsers().subscribe((res:usersList)=>{
            this.users = res;
        });
        this.route.queryParams.subscribe(params=>{
            if (!params["language"]) {
                this.titleService.setTitle("Users")
                this.usersService.getUsers().subscribe((res:usersList)=>{
                    this.users = res;
                });
                return;
            }
            this.titleService.setTitle(`${params["language"]} users`)
            this.usersService.getUsers(params["language"]).subscribe((res:usersList)=>{
                this.users = res;
            });
        })
    }
}
