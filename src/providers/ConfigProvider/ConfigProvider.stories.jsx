import React from 'react';
import {withConfig, withBoundary, ConfigViewer} from '@/test-util';


export default {
    title: 'Providers/ConfigProvider',
    component: ConfigViewer,
}

export const Default = {
    decorators: [withConfig],
}

export const WithoutProvider = {
    decorators: [withBoundary],
}