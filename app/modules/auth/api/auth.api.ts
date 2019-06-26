import { AxiosPromise } from 'axios';
import { User } from '../../common/models/User';

export type LoginParams = Pick<User, 'login' | 'password'>;

export interface IAuthApi {
    login(params: LoginParams): AxiosPromise<User>;

    register(user: User): AxiosPromise<User>;

    checkLoginAlreadyExists(login: string): AxiosPromise<boolean>;

}
