interface IUserName {
    firstName: string;
    lastName: string;
}

interface IUser {
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
}
