export const updateToken = token => ({
    "type": 'UPDATE_TOKEN',
    token
});

export const tokenExpired = token => ({
    "type": 'TOKEN_EXPIRED'
});
