import * as React from 'react';
import { ButtonGroup, Form, Link } from '@servicetitan/design-system';
import { enumToOptions } from '../../common/utils/form-helpers';
import { Role } from '../../common/enums/Role';
import { Label } from '../../common/components/label/label';
import { AuthFormLayout } from './auth-form-layout';

const roleOptions = enumToOptions(Role);

export const RegisterPage: React.FC = () => {

    return (
        <AuthFormLayout
            title="Register"
        >
            <Form>
                <Form.Input
                    type="text"
                    label={(<Label label="Login" hasError={false} />)}
                />
                <Form.Input
                    type="password"
                    label="Password"
                />
                <Form.Input
                    type="password"
                    label={(<Label label="Password Confirmation" hasError={false} />)}
                />
                <Form.Select
                    label={<Label label="Role" error="Strange error" hasError={false} />}
                    value={roleOptions[0].value}
                    options={roleOptions}
                />

                <ButtonGroup fullWidth small>
                    <Link href="/#/login" primary>Sign in</Link>
                    <Form.Button type="submit" primary>Login</Form.Button>
                </ButtonGroup>
            </Form>
        </AuthFormLayout>
    );
};
