import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { rolesEnum, usersList } from 'src/app/customTypes';
import { AuthService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
    ) { }

    ngOnInit(): void {
        
        this.authService.authenticate(this.localStorage.get("jwtToken")!);
        this.usersService.getUsers().subscribe((res:usersList)=>{
            this.users = res;
        });
        this.route.queryParams.subscribe(params=>{
            if (!params["language"]) {
                this.usersService.getUsers().subscribe((res:usersList)=>{
                    this.users = res;
                });
                return;
            }
            this.usersService.getUsers(params["language"]).subscribe((res:usersList)=>{
                this.users = res;
            });
        })
    }
}
