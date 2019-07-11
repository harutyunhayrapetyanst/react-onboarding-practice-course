import { AxiosPromise, AxiosResponse } from 'axios';
import { User } from '../../common/models/user';
import { UsersDB } from '../../mocks/users.db';
import { inject, injectable } from '@servicetitan/react-ioc';
import { mockResponse } from '../../mocks/utils';

export type LoginParams = Pick<User, 'login' | 'password'>;

export interface IAuthApi {
    login(params: LoginParams): AxiosPromise<User | undefined>;

    register(user: User): AxiosPromise<User | undefined>;

    isLoginInUse(login: string): AxiosPromise<boolean>;
}


@injectable()
export class AuthApi implements IAuthApi {


    constructor(@inject(UsersDB) private userDB: UsersDB) {
        console.log('AuthApi:constructor');
    }


    async isLoginInUse(login: string): Promise<AxiosResponse<boolean>> {
        const user = this.userDB.findByLogin(login);
        const exists = !!user;
        return mockResponse(exists, 200);
    }

    async login(params: Pick<User, 'login' | 'password'>): Promise<AxiosResponse<User | undefined>> {
        const user = this.userDB.findByLogin(params.login);

        if (!user || user.password !== params.password) {
            return mockResponse(void 0, 401, 'Incorrect username or password.');
        }

        return mockResponse(user, 200);
    }

    async register(user: User): Promise<AxiosResponse<User | undefined>> {
        const newUser = this.userDB.create(user);
        if (newUser) {
            return mockResponse(newUser, 201);
        } else {
            return mockResponse(void 0, 400, 'Login already taken.');
        }
    }
}
