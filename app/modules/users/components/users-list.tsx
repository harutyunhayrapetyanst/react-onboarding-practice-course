import * as React from 'react';
import { GridColumn } from '@progress/kendo-react-grid';
import { getSelectEditableCell, TextEditableCell } from '../../common/components/kendo-grid/editable-cell';
import { StandardColumnMenuFilter } from '../../common/components/kendo-grid/filters/column-menu-filters';
import { KendoGrid } from '../../common/components/kendo-grid/kendo-grid';
import { enumToOptions, getEnumValues } from '../../common/utils/form-helpers';
import { Role } from '../../common/enums/Role';
import { singleItemMultiSelectColumnMenuFilter } from '../../common/components/kendo-grid/filters/multiselect-filter/multiselect-filter';
import { UserListStore } from '../stores/user-list.store';
import { PasswordEditableCell } from '../../common/components/kendo-grid/editable-cell/password-editable-cell';
import { getActionButtonsCell } from '../../common/components/kendo-grid/cell/action-buttons-cell';
import { User } from '../../common/models/user';

const RoleEditableCell  = getSelectEditableCell(getEnumValues(Role));
const PaymentTypeFilter = singleItemMultiSelectColumnMenuFilter(Array.from(enumToOptions(Role)).map(item => item.value));


export const UsersList: React.FC = () => {
    const store  = new UserListStore();
    const ActionButtonsCell = getActionButtonsCell<User>(
        {
            onCancel: console.log,
            onDelete: console.log,
            onEdit  : console.log,
            onSave  : console.log,
        });

    return (
        <KendoGrid
            gridState={store.gridState}
            groupable
            sortable
            editField="inEdit"
        >
            <GridColumn
                field="id"
                title="id"
                groupable={false}
                editable={false}
                width="100px"
            />

            <GridColumn
                field="login"
                title="login"
                cell={TextEditableCell}
                editable={true}
                groupable={false}
                columnMenu={StandardColumnMenuFilter}
                width="240px"
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
                field=""
                sortable={false}
                title=""
                groupable={false}
                cell={ActionButtonsCell}
            />

        </KendoGrid>
    );
};
