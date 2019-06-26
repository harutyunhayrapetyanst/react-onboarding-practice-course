import { ResponseStatus } from '../enums/ResponseStatus';

export interface IResponse<T> {
    status: ResponseStatus;
    error?: Error;
    data?: T;
}
