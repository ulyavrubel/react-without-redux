export const BACKEND = process.env.NODE_ENV == 'production'
    ? {
        BACKEND: 'https://app.touchpoint-analytics.ru/api',
        WS_BACKEND: 'wss://app.touchpoint-analytics.ru/api/events',
        AUTH_BACKEND: 'https://auth.touchpoint-analytics.ru'
    }
    : {
        BACKEND: 'https://app.touchpoint-analytics.xyz/api',
        WS_BACKEND: 'wss://app.touchpoint-analytics.xyz/api/events',
        AUTH_BACKEND: 'https://auth.touchpoint-analytics.xyz'
    };
