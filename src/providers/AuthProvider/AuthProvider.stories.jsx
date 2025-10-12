import React from 'react';
import {withConfig, withAuth, withBoundary, AuthViewer} from '@/test-util';


export default {
    title: 'AuthProvider',
    component: AuthViewer,
    decorators: [withConfig],
}

export const Default = {
    decorators: [withAuth],
}

export const WithoutProvider = {
    decorators: [withBoundary],
}