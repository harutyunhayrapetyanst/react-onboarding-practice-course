import * as React from 'react';
import { Banner } from '@servicetitan/design-system';

interface IErrorBannerProps {
    error?: string;
}

export const ErrorBanner: React.FC<IErrorBannerProps> = ({ error, ...props }) => {
    if (!error) {
        return null;
    }

    return <Banner status="critical" className="m-t-2 m-b-3" title={error} {...props} />;
};
