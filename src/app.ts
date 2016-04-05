import { Component, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/Rx';

import { User, IUser } from './services/user';
import { UserDao } from './services/user-dao';
import { NgForm } from "angular2/common";

@Component({
    selector: 'my-app',
    templateUrl: '/src/app.html'
})
export class App implements OnInit {

    constructor(private userDao: UserDao) {}

    newUser: User = null;
    
    users = [];

    log(a: any): void {
        console.log(a);
    }

    ngOnInit(): void {
        this.userDao.getUsers().subscribe(users => {
            this.users = users;
        });
    }

    prepareNewUser() { 
        this.newUser = new User();
    }

    editUser(user: User) {
        this.newUser = user.clone();
    }
    
    addOrUpdateUser(user: User, userForm: NgForm) {
        console.log(userForm);
        this.newUser = null;
        if (user.isNew()) {
            this.userDao.createUser(user)
                .subscribe(savedUser => {
                    this.users = this.users.concat(user);
                });
        } else {
            this.userDao.updateUser(user)
                .subscribe(savedUser => {
                    this.users = this.users
                        .map(u => u.id === user.id ? user : u);
                });
        }
        
    }
}
