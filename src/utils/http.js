const defaultSettings = {
    mode: 'cors',
    credentials: 'include'
};

const additionalSearchParams = process.env.NODE_ENV === 'production'
    ? {}
    : {error_details: true};

function request(url, searchParams = {}, settings = defaultSettings) {
    url = new URL(url);
    Object.entries({...additionalSearchParams, ...searchParams})
        .filter(([, value]) => value !== undefined)
        .forEach(([name, value]) => url.searchParams.append(name, value));

    return fetch(url, settings)
        .then(response => response.json()
            .then(result => ({result, ok: response.ok}))
            .catch(() => ({result: {}, ok: response.ok}))
        )
        .then(({result, ok}) => {
            if (!ok)
                throw {error: result};
            return result;
        });
}

function get(url, searchParams = {}, settings = defaultSettings) {
    return request(url, searchParams, {...settings, method: 'get'});
}

function post(url, body = {}, searchParams = {}, settings = defaultSettings) {
    const requestData = {
        ...settings,
        body: body instanceof FormData
            ? body
            : JSON.stringify(body),
        method: 'post'
    };

    setRequestContentType(requestData);

    return request(url, searchParams, requestData);
}

function put(url, body = {}, searchParams = {}, settings = defaultSettings) {
    const requestData = {
        ...settings,
        body: body instanceof FormData
            ? body
            : JSON.stringify(body),
        method: 'put'
    };

    setRequestContentType(requestData);

    return request(url, searchParams, requestData);
}

function setRequestContentType(requestData) {
    const contentType = requestData.body instanceof FormData
        ? undefined
        : 'application/json';

    if (contentType) {
        requestData.headers = requestData.headers || {};
        requestData.headers['Content-Type'] = requestData.headers['Content-Type'] || contentType;
    }
}

function _delete(url, searchParams = {}, settings = defaultSettings) {
    return request(url, searchParams, {...settings, method: 'delete'});
}

export const http = {
    request,
    get,
    post,
    put,
    delete: _delete
};
