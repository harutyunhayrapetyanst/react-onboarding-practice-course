import { Text } from '@servicetitan/design-system';
import * as React from 'react';
import { ErrorBanner } from '../../common/components/error-banner';

interface IAuthFormLayoutProps {
    title: string;
    error?: string;
}

export const AuthFormLayout: React.FC<IAuthFormLayoutProps> = ({ children, title, error }) => {

    return (
        <div style={{ width: '320px' }}>
            <Text className="ta-center" size={4}>{title}</Text>
            <ErrorBanner error={error} />
            {children}
        </div>
    );
};
