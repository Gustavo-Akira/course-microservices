import { CustomError } from "./custom-error";

export class UserExistsError extends CustomError{
    status: number = 400;
    constructor(public email: string){
        super('User already exist with this email');

        Object.setPrototypeOf(this, UserExistsError.prototype);
    }

    serializeErrors(): { message: string; field?: string; }[] {
        return [{message: `User with email ${this.email} already exists`}]
    }
}