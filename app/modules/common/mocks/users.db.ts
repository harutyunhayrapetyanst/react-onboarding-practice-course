import { User } from '../models/user';
import { Role } from '../enums/Role';
import { injectable } from '@servicetitan/react-ioc';
import { cloneDeep } from '../utils/clone-deep';

export const users: User[] = [
    {
        id: 1,
        login: 'rembo',
        password: 'Aaaaaa!1',
        role: Role.Admin
    },
    {
        id: 2,
        login: 'shvarz',
        password: 'Aaaaaa!1',
        role: Role.Operator
    },
    {
        id: 3,
        login: 'john',
        password: 'Aaaaaa!1',
        role: Role.Operator
    },
    {
        id: 4,
        login: 'jack',
        password: 'Aaaaaa!1',
        role: Role.Public
    },
    {
        id: 5,
        login: 'jane',
        password: 'Aaaaaa!1',
        role: Role.Admin
    },
    {
        id: 6,
        login: 'chack',
        password: 'Aaaaaa!1',
        role: Role.Public
    },
    {
        id: 7,
        login: 'walworine',
        password: 'Aaaaaa!1',
        role: Role.Admin
    }
];


@injectable()
export class UsersDB {

    findAll(): User[] {
        return cloneDeep(users);
    }

    findByLogin(login: string): User | undefined {
        if (!login) {
            return void 0;
        }
        const user = users.find(item => item.login === login);
        if (user) {
            return cloneDeep(user);
        }
        return;
    }

    findById(id: number): User | undefined {
        if (!id) {
            return void 0;
        }
        const user = users.find(item => item.id === id);
        return cloneDeep(user);
    }

    create(user: User): User | undefined {
        const userEsists = this.findByLogin(user.login);
        if (userEsists) {
            return undefined;
        }
        const userToSave = cloneDeep(user);
        userToSave.id = this.nextId;
        users.push(userToSave);
        return userToSave;
    }

    update(id: number, data: User): User | undefined {
        const user = this.findById(id);
        if (!user) {
            return void 0;
        }
        return Object.assign(user, data);
    }

    delete(id: number): boolean {
        const index = users.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        users.splice(index, 1);
        return true;
    }

    private get nextId() {
        const maxId = users.reduce((currentMax, item) => (item.id! > currentMax) ? item.id! : currentMax, 1);
        return maxId + 1;
    }
}
