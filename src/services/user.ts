interface IUserName {
    firstName: string;
    lastName: string;
}

export interface IUser {
    id: number;
    name: IUserName;
    age: number;
}

export interface ISaveable {
    isNew(): boolean;
}

export class User implements IUser, ISaveable {
    name: {
        firstName: string;
        lastName: string;
    };

    constructor(
        firstName: string = null,
        lastName: string = null,
        public age: number = null,
        public id?: number
    ) {
        this.name = { firstName, lastName };
    }

    isNew() {
        return !this.id;
    }

    clone() {
        return User.fromUser(this);
    }
    
    static fromUser(user: IUser) {
        return new User(user.name.firstName, user.name.lastName, user.age, user.id);
    }
}
