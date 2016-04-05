interface IUserName {
    firstName: string;
    lastName: string;
}

export interface IUser {
    name: IUserName;
    age: number;
}

export class User implements IUser {
    name: {
        firstName: string;
        lastName: string;
    };

    constructor(
        firstName: string = null,
        lastName: string = null,
        public age: number = null
    ) {
        this.name = { firstName, lastName };
    }
    
    static fromUser(user: IUser) {
        return new User(user.name.firstName, user.name.lastName, user.age);
    }
}
