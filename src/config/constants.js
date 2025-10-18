export const AUTH_ROUTES = {
    SIGN_IN: '/auth/token',
    SIGN_UP: '/ auth/register',
    SIGN_OUT: '/sign-out',
    CSRF_TOKEN: '/csrf',
};

export const AUTH_STATUS = {
    IDLE: 'idle',
    REGISTERED: 'registered',
    AUTHORISED: 'authorised',
    LOADING: 'loading',
    ERROR: 'error',
    ADMIN: 'admin',
    SUPER: 'super',
};

export const AUTH_RANKS = {
    [AUTH_STATUS.ERROR]: 0,
    [AUTH_STATUS.LOADING]: 0,
    [AUTH_STATUS.IDLE]: 0,
    [AUTH_STATUS.REGISTERED]: 1,
    [AUTH_STATUS.AUTHORISED]: 2,
    [AUTH_STATUS.ADMIN]: 3,
    [AUTH_STATUS.SUPER]: 4,
};

export const COOKIE_KEYS = {
    CONSENT: 'cookie-consent',  // whether user accepted cookies
    USER: 'user',                 // stores username + id (JSON/stringified)
    USER_ID: 'id',           // stores user id separately
};

export const STORAGE_KEYS = {
     AUTH_TOKEN: 'auth.token',
     CSRF_TOKEN: 'csrf.token',
};