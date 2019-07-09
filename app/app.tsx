import * as React from 'react';

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Page, SideNav, Stack, Text } from '@servicetitan/design-system';

import { SideNavLinkItem } from './modules/common/components/sidenav-link-item';
import { AuthPage } from './modules/auth/components/auth-page';

import { getUserConfirmation } from './modules/common/components/confirm-navigation/confirm-navigation';

const isAuthenticated = false;

export const App: React.FC = () => (
    <HashRouter getUserConfirmation={getUserConfirmation} hashType="slash">
        {isAuthenticated ? <AuthenticatedPage /> : <AuthPage />}
    </HashRouter>
);


class AuthenticatedPage extends React.Component<{}, {}> {

    handleLogoutLinkClick = () => {
        console.log('logout');
    };

    render() {
        return (
            <Stack alignItems="flex-start" justifyContent="center" className="flex-auto">
                <Stack.Item alignSelf="flex-start">
                    <SideNav title="React Onboarding Practice Course">
                        <SideNavLinkItem pathname="/users">Users</SideNavLinkItem>
                        <SideNavLinkItem pathname="/feed">Feed</SideNavLinkItem>
                        <br />
                        <SideNav.Item onClick={this.handleLogoutLinkClick}>Logout</SideNav.Item>
                    </SideNav>
                </Stack.Item>
                <Stack.Item alignSelf="stretch" fill className="d-f">
                    <Page>
                        <Switch>
                            <Route path="/users" component={HomePage} />
                            <Route path="/feed" component={HomePage} />
                            <Route exact path="/" component={HomePage} />
                            <Redirect to="/" />
                        </Switch>
                    </Page>
                </Stack.Item>
            </Stack>
        );
    }
}


const HomePage: React.FC = () => (
    <Stack alignItems="center" justifyContent="center" className="flex-auto">
        <Text size={5}>React Onboarding Practice Course Template</Text>
    </Stack>
);
