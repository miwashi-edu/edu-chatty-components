import { AUTH_STATUS } from './constants';

export const PAGE_LINKS = [
    { to: '/', label: 'Home', end: true },
    { to: '/mycv', label: 'My CV', minStatus: AUTH_STATUS.REGISTERED  },
    { to: '/taskshop', label: 'Task Shop', minStatus: AUTH_STATUS.REGISTERED  },
    { to: '/example2', label: 'Example 2', minStatus: AUTH_STATUS.AUTHORISED },
    { to: '/register', label: 'Register'  },
    { to: '/cvs', label: 'List CV', minStatus: AUTH_STATUS.ADMIN  },
    { to: '/sign-in', label: 'Sign in'  },
    { to: '/users', label: 'List Users', minStatus: AUTH_STATUS.SUPER  },
    { to: '/debug', label: 'Debug', minStatus: AUTH_STATUS.SUPER  },
];
