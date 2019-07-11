import * as React from 'react';
import { configure } from 'mobx';

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Dialog, Page, SideNav, Stack, Text } from '@servicetitan/design-system';

import { SideNavLinkItem } from './modules/common/components/sidenav-link-item';
import { getUserConfirmation } from './modules/common/components/confirm-navigation/confirm-navigation';
import { AuthPage } from './modules/auth/components/auth-page';
import { Confirm, ConfirmationProps } from './modules/common/components/confirm/confirm';
import { UsersPage } from './modules/users/components/user-page';


configure({ enforceActions: 'observed' });

export const App: React.FC = () => {
    const isAuthenticated = true;
    return (
        <HashRouter getUserConfirmation={getUserConfirmation} hashType="slash">
            {isAuthenticated ? <AuthenticatedPage /> : <AuthPage />}
        </HashRouter>
    );
};


const AuthenticatedPage = () => {

    function handleLogoutLinkClick() {
        console.log('logout');
    }

    return (
        <Stack alignItems="flex-start" justifyContent="center" className="flex-auto">
            <Stack.Item alignSelf="flex-start">
                <SideNav title="React Onboarding Practice Course">
                    <SideNavLinkItem pathname="/users">Users</SideNavLinkItem>
                    <SideNavLinkItem pathname="/feed">Feed</SideNavLinkItem>
                    <br />
                    <Confirm onClick={handleLogoutLinkClick} confirmation={LogoutConfirmation}>
                        {onClick => (
                            <SideNav.Item onClick={onClick}>Logout</SideNav.Item>
                        )}
                    </Confirm>
                </SideNav>
            </Stack.Item>
            <Stack.Item alignSelf="stretch" fill className="d-f">
                <Page>
                    <Switch>
                        <Route path="/users" component={UsersPage} />
                        <Route path="/feed" component={HomePage} />
                        <Route exact path="/" component={HomePage} />
                        <Redirect to="/" />
                    </Switch>
                </Page>
            </Stack.Item>
        </Stack>
    );
};

const LogoutConfirmation: React.FC<ConfirmationProps> = ({ onConfirm, onCancel }) => (
    <Dialog
        open
        negative
        title="Are you sure you want to logout?"
        onClose={onCancel}
        primaryActionName="Logout"
        onPrimaryActionClick={onConfirm}
        secondaryActionName="Cancel"
        onSecondaryActionClick={onCancel}
    />
);


const HomePage: React.FC = () => (
    <Stack alignItems="center" justifyContent="center" className="flex-auto">
        <Text size={5}>React Onboarding Practice Course Template</Text>
    </Stack>
);
