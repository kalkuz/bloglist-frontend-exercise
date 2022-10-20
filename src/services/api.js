import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const get = (endpoint) => axios.get(baseUrl + endpoint, { headers: { authorization: window.localStorage.getItem('token') } }).then((data) => data.data);

const post = (endpoint, body) => axios.post(baseUrl + endpoint, body, { headers: { authorization: window.localStorage.getItem('token') } }).then((data) => data.data);

const put = (endpoint, body) => axios.put(baseUrl + endpoint, body, { headers: { authorization: window.localStorage.getItem('token') } }).then((data) => data.data);

const del = (endpoint) => axios.delete(baseUrl + endpoint, { headers: { authorization: window.localStorage.getItem('token') } }).then((data) => data.data);

export {
  get, post, put, del,
};
