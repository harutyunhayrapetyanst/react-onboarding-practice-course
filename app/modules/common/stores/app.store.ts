import { injectable } from '@servicetitan/react-ioc';
import { action, computed, observable } from 'mobx';
import { User } from '../models/user';

@injectable()
export class AppStore {

    constructor() {
        console.log('AppStore:constructor');
    }

    @observable
    private loggedInUser?: User;

    @action
    setLoggedInUser(user: User) {
        this.loggedInUser = user;
    }

    @action
    removeLoggedInUser() {
        this.loggedInUser = void 0;
    }

    @computed
    get isAuthenticated() {
        return !!this.loggedInUser;
    }

}
