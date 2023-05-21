import {hookstate, useHookstate} from "@hookstate/core";
import {DEFAULT_THEME, THEMES} from "@/config/index.js";
import PrimeReact from "primereact/api";
import {useEffect} from "react";
import {getAppTheme, saveAppTheme} from "@/utils/LocalStorageUtils.js";

const initialState = hookstate({
    theme: "",
});

export const useUIState = () => {
    const state = useHookstate(initialState);

    useEffect(() => {
        //* Si no es la primera vez que se carga la página, no se hace nada
        if (state.theme.value)
            return;
        //* Si es la primera vez que se carga la página, se obtiene el tema de la aplicación y se establece
        const appTheme = getAppTheme();
        //* Si existe un tema guardado en el local storage, se establece
        if (appTheme) {
            state.theme.set(appTheme);
            if (appTheme !== THEMES[DEFAULT_THEME])
                handleChangeTheme(THEMES[DEFAULT_THEME], appTheme)
        }
        //* Si no existe un tema guardado en el local storage, se establece el tema por defecto
        else {
            state.theme.set(THEMES[DEFAULT_THEME]);
        }

    }, [state.theme.value])

    const handleChangeTheme = (current, actual) => {
        PrimeReact.changeTheme(current, actual, 'theme-link');
    }

    return {
        appTheme: state.theme.value,
        toogleTheme: () => {
            const currentTheme = state.theme.value;
            const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
            handleChangeTheme(currentTheme, newTheme)
            state.theme.set(newTheme);
            saveAppTheme(newTheme);
        }
    };
};