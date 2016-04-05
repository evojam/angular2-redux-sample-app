import { Component } from 'angular2/core';
import { User } from './services/user';


@Component({
    selector: 'my-app',
    templateUrl: '/src/app.html'
})
export class App {

    newUser: User = null;
    
    users = [
        new User('Eryk', 'Thorsson', 233),
        new User('Adam', 'Adamov', 53),
        new User('Xena', 'Booby', 25)
    ];

    prepareNewUser() { 
        this.newUser = new User();
    }
    
    addNewUser(user: User) {
        this.users = this.users.concat(user);
        this.newUser = null;
    }
}
