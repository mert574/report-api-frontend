export const Query = async function Query(url, method="POST", paramsObj, header) {

    let params = "?";

    Object.entries(paramsObj).forEach(([key, val])=>{ params += `${key}=${val}&`; });
    params = params.substr(0, params.length-1);

    return await fetch(url + params, {
        "method": method,
        "headers": header
    }).then(r=>r.json());
}
