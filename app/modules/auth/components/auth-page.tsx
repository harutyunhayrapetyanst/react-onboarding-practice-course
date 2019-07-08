import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';
import { Stack } from '@servicetitan/design-system';

export const AuthPage: React.FC = () => {
    return (
        <Stack alignItems="center" justifyContent="center" className="flex-auto">
            <Stack.Item>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Redirect to="/login" />
                </Switch>
            </Stack.Item>
        </Stack>
    );
};
