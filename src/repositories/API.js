import axios from 'axios';
import {API_URL, HTTP_TYPES} from '@/config/constants';
import {getToken, removeToken} from "@/utils/LocalStorageUtils.js";
import {endLoading, startLoading} from "@/hooks/UIState.js";

const API = axios.create({
    baseURL: API_URL,
    timeout: 5000,
})

const configData = (type, config = null) => {
    if (type === HTTP_TYPES.REQUEST) {
        if (!config?.background)
            startLoading();
    } else if (type === HTTP_TYPES.RESPONSE) {
        if (!config?.background)
            endLoading();
    }
}

API.interceptors.request.use(
    config => {
        configData(HTTP_TYPES.REQUEST, config)
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    }
);

API.interceptors.response.use(
    response => {
        configData(HTTP_TYPES.RESPONSE, response?.config)
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            removeToken();
            document.location.href = '/login';
        }
    }
);

export default API;