import { Component } from 'angular2/core';
import { User } from './services/user';


@Component({
    selector: 'my-app',
    templateUrl: '/src/app.html'
})
export class App {
    users = [
        new User('Eryk', 'Thorsson', 233),
        new User('Adam', 'Adamov', 53),
        new User('Xena', 'Booby', 25)
    ];
}
