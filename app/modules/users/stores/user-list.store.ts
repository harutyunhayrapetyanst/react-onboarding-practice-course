import { inject, injectable } from '@servicetitan/react-ioc';
import { FieldState, FormState } from 'formstate';
import { action, computed, observable, runInAction } from 'mobx';
import { InMemoryDataSource, KendoGridState } from '../../common/components/kendo-grid/kendo-grid-state';
import { Role } from '../../common/enums/Role';
import { users } from '../../common/mocks/users.db';
import { User } from '../../common/models/user';
import { setFormStateValues } from '../../common/utils/form-helpers';
import { IUserApi, UserApi } from '../api/user.api';


@injectable()
export class UserListStore {
    private static PAGE_SIZE = 5;

    gridState: KendoGridState<User, User['id']>;

    @observable
    serverError: string = '';

    constructor(@inject(UserApi) private userApi: IUserApi) {
        this.gridState = new KendoGridState({
            dataSource: this.getDataSource(),
            pageSize: UserListStore.PAGE_SIZE,
            idSelector: user => user.id!,
            getFormState: this.getFormState
        });
    }

    private getDataSource() {
        return new InMemoryDataSource(users);
    }

    getFormState = (user: User) => {
        return setFormStateValues(
            new FormState({
                id: new FieldState(user.id),
                login: new FieldState(user.login),
                password: new FieldState(user.password),
                role: new FieldState<Role>(user.role),
            }),
            user);
    }

    @computed
    get isInEdit() {
        return this.gridState.inEdit.size > 0;
    }

    @action
    loadUsers = () => {
        this.userApi.getAll();
    }

    @action
    onEdit = (dataItem: User) => {
        this.gridState.edit(dataItem);
    }

    @action
    onCancel = (dataItem: User) => {
        this.gridState.cancelEdit(dataItem);
    }

    @action
    onSave = async (dataItem: User) => {
        const user = { ...dataItem };
        const response = await this.userApi.updateUser(user.id!, user);
        if (response.status === 200) {
            runInAction(() => {
                this.gridState.saveEdit(dataItem);
            });
        } else {
            runInAction(() => {
                this.serverError = response.statusText;
            });
        }
    }


    @action
    onDelete = async (dataItem: User) => {
        const response = await this.userApi.deleteUser(dataItem.id!);
        if (response.status === 200) {
            this.gridState.removeFromDataSource(item => item.id === dataItem.id);
        } else {
            runInAction(() => {
                this.serverError = response.statusText;
            });
        }
    }
}
