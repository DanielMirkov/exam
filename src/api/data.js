import * as api from './api.js';

export const host = 'http://localhost:3030';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllRecords() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}
export async function getAllRecentRecords() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function searchRecords(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);
}

export async function getRecordById(id) {
    return await api.get(host + '/data/wiki/' + id);
}

export async function editRecord(id, data) {
    return await api.put(host + '/data/wiki/' + id, data);
}
/*
 */
export async function createRecord(data) {
    return await api.post(host + '/data/wiki', data);
}


export async function deleteRecord(id) {
    return await api.del(host + '/data/wiki/' + id);
}