import { CustomError } from "./custom-error";

export class UserNotExistsError extends CustomError{
    status: number = 400;
    constructor(public email: string){
        super('User not exist with this email');

        Object.setPrototypeOf(this, UserNotExistsError.prototype);
    }

    serializeErrors(): { message: string; field?: string; }[] {
        return [{message: `User with email ${this.email} not exists`}]
    }
}