import { AxiosPromise } from 'axios';
import { User } from '../../common/models/user';


export interface IUserApi {
    getAll(): AxiosPromise<User[]>;

    updateUser(id: number, user: User): AxiosPromise<User>;

    deleteUser(id: number): AxiosPromise<void>;
}
