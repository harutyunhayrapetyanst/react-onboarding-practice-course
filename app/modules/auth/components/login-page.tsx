import * as React from 'react';

import { ButtonGroup, Form, Link } from '@servicetitan/design-system';
import { injectDependency, provide } from '@servicetitan/react-ioc';

import { Label } from '../../common/components/label/label';
import { AuthFormLayout } from './auth-form-layout';

import { LoginStore } from '../stores/login.store';
import { observer } from 'mobx-react';


@provide({
             singletons: [
                 LoginStore,
             ],
         })
@observer
export class LoginPage extends React.Component {

    @injectDependency(LoginStore)
    private loginStore!: LoginStore;

    render() {
        const { errorMessage, formState, loginAction } = this.loginStore;
        const { login, password } = formState.$;

        return (
            <AuthFormLayout
                title="Login"
                error={errorMessage}
            >
                <Form onSubmit={loginAction}>
                    <Form.Input
                        type="text"
                        label={<Label label="Login" hasError={login.hasError} error={login.error} />}
                        error={login.hasError}
                        value={login.value}
                        onChange={login.onChangeHandler}

                    />
                    <Form.Input
                        type="password"
                        label={<Label label="Password" hasError={password.hasError} error={password.error} />}
                        error={password.hasError}
                        onChange={password.onChangeHandler}
                        value={password.value}
                    />
                    <ButtonGroup fullWidth>
                        <Link href="/#/register" primary>Sign up</Link>
                        <Form.Button type="submit" primary>Login</Form.Button>
                    </ButtonGroup>
                </Form>
            </AuthFormLayout>
        );
    }
}
