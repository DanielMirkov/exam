export const settings = {
    host: ''
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const eror = await response.json();
            alert(eror.message);
            throw new Error(eror.message);
        }
        try {

            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function getOptions(method = 'get', body) {

    const options = {
        method,
        headers: {},
    };

    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

async function get(url) {
    return await request(url, getOptions());
}

async function post(url, data) {

    return await request(url, getOptions('post', data));
}

async function put(url, data) {
    return await request(url, getOptions('put', data));
}

async function del(url) {
    return await request(url, getOptions('delete'));
}

//make sure correct data comes
async function login(email, password) {

    const result = await post(settings.host + '/users/login', { email, password });

    //set tokens accordingly

    sessionStorage.setItem('email', result.username);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    return result;
}

//make sure correct data comes
async function register(email, password) {

    const result = await post(settings.host + '/users/register', { email, password });

    //set tokens accordingly
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    return result;
}

async function logout() {

    const result = await get(settings.host + '/users/logout');

    //set tokens accordingly
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    return result;
}

export {
    login,
    register,
    logout,
    post,
    get,
    put,
    del,
}