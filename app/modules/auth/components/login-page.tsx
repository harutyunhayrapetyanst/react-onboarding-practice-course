import * as React from 'react';
import { ButtonGroup, Form, Link } from '@servicetitan/design-system';
import { AuthFormLayout } from './auth-form-layout';

export const LoginPage: React.FC = () => {

    return (
        <AuthFormLayout
            title="Login"
            error="Incorrect username or password"
        >
            <Form>
                <Form.Input type="text" label="Login" />
                <Form.Input type="password" label="Password" />
                <ButtonGroup fullWidth small>
                    <Link href="/#/register" primary>Sign up</Link>
                    <Form.Button type="submit" primary>Login</Form.Button>
                </ButtonGroup>
            </Form>
        </AuthFormLayout>
    );
};
