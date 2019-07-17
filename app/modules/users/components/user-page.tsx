import * as React from 'react';
import { UsersList } from './users-list';
import { UserApi } from '../api/user.api';
import { provide } from '@servicetitan/react-ioc';

export const UsersPage: React.FC = provide({ singletons: [UserApi] })(() => {
    return (
        <React.Fragment>
            <UsersList />
        </React.Fragment>
    );
});
