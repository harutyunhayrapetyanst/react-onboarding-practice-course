import { InMemoryDataSource, KendoGridState } from '../../common/components/kendo-grid/kendo-grid-state';
import { User } from '../../common/models/user';
import { users } from '../../common/mocks/users.db';
import { setFormStateValues } from '../../common/utils/form-helpers';
import { FieldState, FormState } from 'formstate';
import { Role } from '../../common/enums/Role';


export class UserListStore {
    private static PAGE_SIZE = 5;

    get gridState(): KendoGridState<User, User['id']> {
        return new KendoGridState(
            {
                dataSource: this.getDataSource(),
                pageSize: UserListStore.PAGE_SIZE,
                idSelector: this.idSelector,
                getFormState: this.getFormState
            });
    }

    private getDataSource() {
        return new InMemoryDataSource(users);
    }

    private idSelector(user: User) {
        return user.id;
    }

    getFormState(user: User) {
        return setFormStateValues(
            new FormState({
                id: new FieldState(user.id),
                login: new FieldState(user.login),
                password: new FieldState(user.password),
                role: new FieldState<Role>(user.role),
            }),
            user);
    }
}
