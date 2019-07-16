import { Dialog, Page, SideNav, Stack, Text } from '@servicetitan/design-system';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { configure } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthPage } from './modules/auth/components/auth-page';
import { getUserConfirmation } from './modules/common/components/confirm-navigation/confirm-navigation';
import { Confirm, ConfirmationProps } from './modules/common/components/confirm/confirm';
import { SideNavLinkItem } from './modules/common/components/sidenav-link-item';
import { UsersDB } from './modules/common/mocks/users.db';
import { AppStore } from './modules/common/stores/app.store';
import { UsersPage } from './modules/users/components/user-page';




configure({ enforceActions: 'observed' });

export const App: React.FC = provide({ singletons: [AppStore, UsersDB] })(observer(() => {
    const [{ isAuthenticated }] = useDependencies(AppStore);
    // const isAuthenticated = true;
    return (
        <HashRouter getUserConfirmation={getUserConfirmation} hashType="slash">
            {isAuthenticated ? <AuthenticatedPage /> : <AuthPage />}
        </HashRouter>
    );
}));


const AuthenticatedPage = observer(() => {
    const [appStore] = useDependencies(AppStore);

    function onLogoutClick() {
        appStore.removeLoggedInUser();
    }

    return (
        <Stack alignItems="flex-start" justifyContent="center" className="flex-auto">
            <Stack.Item alignSelf="flex-start">
                <SideNav title="React Onboarding Practice Course">
                    <SideNavLinkItem pathname="/users">Users</SideNavLinkItem>
                    <SideNavLinkItem pathname="/feed">Feed</SideNavLinkItem>
                    <br />
                    <Confirm onClick={onLogoutClick} confirmation={LogoutConfirmation}>
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
});

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
