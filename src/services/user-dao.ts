import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/Rx';

import { User, IUser } from './user';
import { Observable } from "rxjs/Observable";

interface IRes {
    _embedded: {
        people: IUser[];
    }
}

@Injectable()
export class UserDao {

    constructor(private http: Http) {}

    getUsers(): Observable<Array<User>> {
        return this.http.get('http://6183d394.ngrok.io/people')
            .map(res => <IRes> res.json())
            .map((res: IRes) => res._embedded.people)
            .map(users => users.map(User.fromUser));
    }

}