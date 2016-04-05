import { Component, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/Rx';

import { User, IUser } from './services/user';
import { UserDao } from './services/user-dao';

@Component({
    selector: 'my-app',
    templateUrl: '/src/app.html'
})
export class App implements OnInit {

    constructor(private userDao: UserDao) {}

    newUser: User = null;
    
    users = [];

    ngOnInit(): void {
        this.userDao.getUsers().subscribe(users => {
            this.users = users;
        });
    }

    prepareNewUser() { 
        this.newUser = new User();
    }
    
    addNewUser(user: User) {
        this.users = this.users.concat(user);
        this.newUser = null;
    }
}
