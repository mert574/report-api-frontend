const TOKEN_EXPIRES_AFTER_MS = 600000;

export const updateToken = (token, expiresOn) => {
    expiresOn = expiresOn || (Date.now() + TOKEN_EXPIRES_AFTER_MS);

    localStorage.setItem('AuthToken', token);
    localStorage.setItem('AuthExpire', expiresOn);

    return {
        "type": 'UPDATE_TOKEN',
        expiresOn, token
    }
};

export const tokenExpired = token => {
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('AuthExpire');

    return { "type": 'TOKEN_EXPIRED' };
}
