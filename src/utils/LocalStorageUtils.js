export const saveToken = (token) => {
    localStorage.setItem('token', token);
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const getAppTheme = () => {
    return localStorage.getItem('theme');
}

export const saveAppTheme = (theme) => {
    localStorage.setItem('theme', theme);
}