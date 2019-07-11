import * as React from 'react';
import { enumToOptions } from '../../common/utils/form-helpers';
import { Role } from '../../common/enums/Role';
import { AuthFormLayout } from './auth-form-layout';
import { ButtonGroup, Form, Link } from '@servicetitan/design-system';
import { Label } from '../../common/components/label/label';
import { observer } from 'mobx-react';
import { injectDependency, provide } from '@servicetitan/react-ioc';
import { RegisterStore } from '../stores/register.store';

const roleOptions = enumToOptions(Role);

@provide({
             singletons: [
                 RegisterStore
             ]
         })
@observer
export class RegisterPage extends React.Component {

    @injectDependency(RegisterStore)
    private registerStore!: RegisterStore;

    render() {
        const { formState, passwordsFormState, errorMessage, register: onRegister } = this.registerStore;
        const { login, role } = formState.$;
        const { password, passwordConfirm } = passwordsFormState.$;

        return (
            <AuthFormLayout
                title="Register"
                error={errorMessage}
            >
                <Form onSubmit={onRegister}>
                    <Form.Input
                        type="text"
                        label={(<Label label="Login" hasError={login.hasError} error={login.error} />)}
                        error={login.hasError}
                        value={login.value}
                        onChange={login.onChangeHandler}
                    />
                    <Form.Input
                        type="password"
                        label={(<Label label="Password" hasError={password.hasError} error={password.error} />)}
                        error={password.hasError}
                        value={password.value}
                        onChange={password.onChangeHandler}
                    />
                    <Form.Input
                        type="password"
                        label={(<Label label="Password Confirmation" hasError={passwordConfirm.hasError} error={passwordConfirm.error} />)}
                        error={passwordConfirm.hasError}
                        value={passwordConfirm.value}
                        onChange={passwordConfirm.onChangeHandler}
                    />
                    <Form.Select
                        options={roleOptions}
                        label={(<Label label="Role" hasError={role.hasError} error={role.error} />)}
                        error={role.hasError}
                        value={Role.Public}
                        onChange={role.onChangeHandler}
                    />

                    <ButtonGroup fullWidth>
                        <Link href="/#/login" primary>Sign in</Link>
                        <Form.Button type="submit" primary>Register</Form.Button>
                    </ButtonGroup>
                </Form>
            </AuthFormLayout>
        );
    }
}
