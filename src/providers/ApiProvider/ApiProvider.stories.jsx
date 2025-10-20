import React from 'react';
import {withApi, withAuth, withConfig, withBoundary, ApiViewer, AuthViewer, ConfigViewer} from '@/test-util';


export default {
    title: 'Providers/ApiProvider',
    component: ApiViewer,
}

export const Default = {
    decorators: [withApi, withAuth, withConfig, withBoundary],
}

export const WithoutProvider = {
    decorators: [withBoundary],
}