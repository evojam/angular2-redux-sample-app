import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import 'rxjs/Rx';

import { User, IUser } from './user';
import { Observable } from "rxjs/Observable";

interface IRes {
    _embedded: {
        people: IUser[];
    }
}

const PEOPLE_API_URL = 'http://6183d394.ngrok.io/people';

@Injectable()
export class UserDao {

    constructor(private http: Http) {}

    getSaveHeaders() {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getUsers(): Observable<Array<User>> {
        return this.http.get(PEOPLE_API_URL)
            .map(res => <IRes> res.json())
            .map((res: IRes) => res._embedded.people)
            .map(users => users.map(User.fromUser));
    }

    createUser(newUser: User): Observable<User> {
        return this.http.post(PEOPLE_API_URL, JSON.stringify(newUser), {
            headers: this.getSaveHeaders()
        })
            .map(res => <IUser> res.json())
            .map(User.fromUser);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put(`${ PEOPLE_API_URL }/${ user.id }`, JSON.stringify(user), {
            headers: this.getSaveHeaders()
        })
            .map(res => <IUser> res.json())
            .map(User.fromUser);
    }

}