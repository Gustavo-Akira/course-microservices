import { CustomError } from "./custom-error";

export class EmailPasswordNotMatchError extends CustomError{
    status: number = 400;
    constructor(){
        super('Email and password not match');

        Object.setPrototypeOf(this, EmailPasswordNotMatchError.prototype);
    }

    serializeErrors(): { message: string; field?: string; }[] {
        return [{message: 'Email and password not match'}]
    }
}