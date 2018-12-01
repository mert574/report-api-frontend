const LoginHandler = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...state,
                "token": action.token
            };

        case 'TOKEN_EXPIRED':
            return {
                ...state,
                "token": null
            }
            
        default:
            return state;
    }
}

export default LoginHandler;
