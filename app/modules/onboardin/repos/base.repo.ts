import { ResponseStatus } from "../enums/ResponseStatus";

export class BaseRepo {
    sendError(error: Error) {
        return {
            status: ResponseStatus.ERROR,
            error
        }
    }
}