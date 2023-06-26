// encrypt with crypto-js
import CryptoJS from "crypto-js";
import { CRYPTO_SECRET_KEY} from "@/config/index.js";

export const getToken = () => {
    const tokenEncrypted = localStorage.getItem('token');
    return tokenEncrypted ? decrypt(tokenEncrypted) : null;
}

export const saveToken = (token) => {
    localStorage.setItem('token', encrypt(token));
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const getAuthUser = () => {
    const authUserEncrypted = localStorage.getItem('authUser');
    return authUserEncrypted ? decrypt(authUserEncrypted) : '';
}

export const saveAuthUser = (authUser) => {
    localStorage.setItem('authUser', encrypt(authUser));
}

export const removeAuthUser = () => {
    localStorage.removeItem('authUser');
}

export const updateProfilePicture = (profilePicture) => {
    const authUser = getAuthUser();
    authUser.profilePicture = profilePicture;
    saveAuthUser(authUser);
}

export const getAppTheme = () => {
    return localStorage.getItem('theme');
}

export const saveAppTheme = (theme) => {
    localStorage.setItem('theme', theme);
}

const encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_SECRET_KEY).toString();
}

const decrypt = (data) => {
    return JSON.parse(CryptoJS.AES.decrypt(data, CRYPTO_SECRET_KEY).toString(CryptoJS.enc.Utf8));
}

export const saveConsultInProgress = (consult) => {
    localStorage.setItem('consultInProgress', encrypt(consult));
}

export const getConsultInProgress = () => {
    const consultEncrypted = localStorage.getItem('consultInProgress');
    return consultEncrypted ? decrypt(consultEncrypted) : null;
}

export const removeConsultInProgress = () => {
    localStorage.removeItem('consultInProgress');
}