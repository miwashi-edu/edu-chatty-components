import React from 'react';
import {ErrorBoundary} from '@/util'

const withBoundary = (Story, context) => {
    return (
        <ErrorBoundary>
            <Story />
        </ErrorBoundary>
    );
};

export default withBoundary;