import { AxiosPromise } from "axios";
import { User } from "../models/User";


export interface IAuthApi {
    login(params: User): AxiosPromise<User>,

    register(user: User): AxiosPromise<User>,

    checkLoginAlreadyExists(login: string): AxiosPromise<boolean>,

}
