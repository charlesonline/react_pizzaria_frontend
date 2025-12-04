import axios from 'axios';

export const api = axios.create({
    // baseURL: 'http://172.20.0.3:3333',
    // baseURL: 'http://pizzaws.dev:3333',
    baseURL: 'http://192.168.1.4:3333',
});