import React from 'react';
import {Footer} from '.';
import {withConfig, withAuth} from '@/test-util';

export default {
    title: 'Components/Footer',
    component: Footer,
    decorators: [withAuth, withConfig]
}

export const Default = {

}