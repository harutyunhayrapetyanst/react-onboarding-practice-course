import { AxiosPromise } from "axios";
import { User } from "../models/User";

export interface IUsersRequestParams {
    sort?: string,
    limit?: number,
    page?: number,
}

export interface IUserApi {
    getUsers(params?: IUsersRequestParams): AxiosPromise<User[]>,

    getUserById(id: number): AxiosPromise<User>,

    updateUser(user: User): AxiosPromise<User>,

    deleteUser(id: number): AxiosPromise<void>,
}
