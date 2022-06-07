import { Component, OnInit } from '@angular/core';
import { usersList } from 'src/app/customTypes';
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

    constructor(
        private authService: AuthService,
        private usersService: UsersPanelService,
        private localStorage: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.authService.authenticate(this.localStorage.get("jwtToken")!);
        this.usersService.getUsers().subscribe((res:usersList)=>{
            this.users = res;
        });
    }

}
