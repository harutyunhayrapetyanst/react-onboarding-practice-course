import { GridColumn } from '@progress/kendo-react-grid';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Prompt } from 'react-router';
import { ErrorBanner } from '../../common/components/error-banner';
import { getActionButtonsCell } from '../../common/components/kendo-grid/cell/action-buttons-cell';
import { getSelectEditableCell, TextEditableCell } from '../../common/components/kendo-grid/editable-cell';
import { PasswordEditableCell } from '../../common/components/kendo-grid/editable-cell/password-editable-cell';
import { StandardColumnMenuFilter } from '../../common/components/kendo-grid/filters/column-menu-filters';
import { singleItemMultiSelectColumnMenuFilter } from '../../common/components/kendo-grid/filters/multiselect-filter/multiselect-filter';
import { KendoGrid } from '../../common/components/kendo-grid/kendo-grid';
import { Role } from '../../common/enums/Role';
import { User } from '../../common/models/user';
import { enumToOptions, getEnumValues } from '../../common/utils/form-helpers';
import { UserListStore } from '../stores/user-list.store';


const RoleEditableCell = getSelectEditableCell(getEnumValues(Role));
const PaymentTypeFilter = singleItemMultiSelectColumnMenuFilter(Array.from(enumToOptions(Role)).map(item => item.value));


export const UsersList: React.FC = provide({ singletons: [UserListStore] })(observer(() => {

    const [userListStore] = useDependencies(UserListStore);
    const errorMessage = userListStore.serverError;

    const ActionButtonsCell = getActionButtonsCell<User>(
        {
            onCancel: userListStore.onCancel,
            onDelete: userListStore.onDelete,
            onEdit: userListStore.onEdit,
            onSave: userListStore.onSave,
        });

    return (
        <>
            <Prompt when={userListStore.isInEdit} message="/users" />
            <ErrorBanner error={errorMessage} />
            <KendoGrid
                gridState={userListStore.gridState}
                groupable
                sortable
            >
                <GridColumn
                    field="id"
                    title="id"
                    groupable={false}
                    editable={false}
                    width="70px"
                />

                <GridColumn
                    field="login"
                    title="login"
                    cell={TextEditableCell}
                    editable={true}
                    groupable={false}
                    columnMenu={StandardColumnMenuFilter}

                />

                <GridColumn
                    field="password"
                    title="password"
                    editable={true}
                    cell={PasswordEditableCell}
                    sortable={false}
                    groupable={false}
                />


                <GridColumn
                    field="role"
                    title="role"
                    editable={true}
                    columnMenu={PaymentTypeFilter}
                    cell={RoleEditableCell}
                />

                <GridColumn
                    title="Actions"
                    sortable={false}
                    groupable={false}
                    cell={ActionButtonsCell}
                />

            </KendoGrid>
        </>
    );
}));
