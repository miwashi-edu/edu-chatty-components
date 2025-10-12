import React from 'react';
import { configuration } from '@/config';
import { ConfigContext } from '@/providers';

export const withConfig = (Story, context) => {
    const cfg = configuration;

    return (
        <ConfigContext.Provider value={cfg}>
            <Story />
        </ConfigContext.Provider>
    );
};
