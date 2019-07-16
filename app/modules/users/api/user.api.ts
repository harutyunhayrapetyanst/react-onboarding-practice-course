import { AxiosPromise } from 'axios';
import { User } from '../../common/models/user';
import { injectable, inject } from '@servicetitan/react-ioc';
import { UsersDB } from '../../common/mocks/users.db';
import { mockResponse } from '../../common/mocks/utils';


export interface IUserApi {
    getAll(): AxiosPromise<User[]>;

    updateUser(id: number, user: User): AxiosPromise<User | null>;

    deleteUser(id: number): AxiosPromise<void>;
}

@injectable()
export class UserApi implements IUserApi {

    constructor(@inject(UsersDB) private userDB: UsersDB) {
    }

    getAll(): AxiosPromise<User[]> {
        const users = this.userDB.findAll();
        return mockResponse(users, 200);
    }

    updateUser(id: number, user: User): AxiosPromise<User | null> {
        const updatedUser = this.userDB.update(id, user);
        if (!updatedUser) {
            return mockResponse(null, 400);
        }
        return mockResponse(updatedUser, 200);
    }

    deleteUser(id: number): AxiosPromise<void> {
        const isDeleted = this.userDB.delete(id);
        if (isDeleted) {
            return mockResponse(void 0, 200);
        } else {
            return mockResponse(void 0, 400);
        }
    }
}
