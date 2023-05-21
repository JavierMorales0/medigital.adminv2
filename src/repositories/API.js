import axios from 'axios';
import { API_URL } from '@/config/constants';

const API = axios.create({
    baseURL: API_URL,
    timeout: 5000,
})

export default API;