import React from 'react';
import {PageShell} from '.';
import { withConfig, withAuth  } from "@/test-util";

export default {
    title: 'Templates/PageShell',
    component: PageShell,
    decorators: [withAuth, withConfig]
};

export const Default = {
};