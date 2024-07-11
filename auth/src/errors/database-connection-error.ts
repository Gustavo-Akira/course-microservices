import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    status = 503;
    reason = "Error connecting to the database";
    constructor(){
        super("Error connecting db");

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [
            {message: this.reason}
        ]
    }
}