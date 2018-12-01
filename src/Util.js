import Store from './Store';

export const sendRequest = async function sendRequest(url, method="POST", paramsObj={}, header={}) {
    let params = "?";

    header.Authorization = extractAuth(Store.getState());

    Object.entries(paramsObj).forEach(([key, val])=>{ params += `${key}=${val}&`; });
    params = params.substr(0, params.length-1);

    return await fetch(url + params, { "method": method, "headers": header }).then(r=>r.json());
}

export const parseDate = function parseDate(date) {
    return date.getFullYear() + '-' + paddedNum(date.getMonth() + 1) + '-' + paddedNum(date.getDate());
}

export const paddedNum = function paddedNum(num) {
    return (num < 10) ? `0${num}` : `${num}`;
}

function extractAuth(state) {
    return state.hasOwnProperty('Login') && state.Login.hasOwnProperty('token') ? state.Login.token : null;
}
