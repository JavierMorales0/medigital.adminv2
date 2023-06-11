import {hookstate, useHookstate} from "@hookstate/core";
import {DEFAULT_THEME, THEMES} from "@/config/index.js";
import PrimeReact from "primereact/api";
import {useEffect, useMemo} from "react";
import {getAppTheme, saveAppTheme} from "@/utils/LocalStorageUtils.js";
import {useLocation} from "react-router-dom";

export const uiState = hookstate({
    theme: "",
    menu: [],
    activeMenu: "",
    loading: 0,
    isVisibleChangeProfilePictureDialog: false,
});

export const startLoading = () => {
    uiState.loading.set(uiState.loading.value + 1)
}

export const endLoading = () => {
    uiState.loading.set(uiState.loading.value > 0 ? uiState.loading.value - 1 : 0)
}

export const useUIState = () => {
    const state = useHookstate(uiState);
    const {pathname} = useLocation();

    useEffect(() => {
        state.activeMenu.set(pathname);
    }, [pathname])

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


    const completeMenu = useMemo(() => {
        const _menu = state.get({noproxy: true}).menu;
        if (_menu?.length === 0) return [];
        return _menu?.reduce((acc, item) => {
            if (!state.activeMenu.value?.startsWith(item.path) || !item.path) return [...acc, {...item, className: ''}]
            item.className = 'active-menu';
            return [...acc, item]
        }, [])
    }, [state?.menu?.value?.length, state?.activeMenu?.value])


    return {
        appTheme: state.theme.value,
        toogleTheme: () => {
            const currentTheme = state.theme.value;
            const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
            handleChangeTheme(currentTheme, newTheme)
            state.theme.set(newTheme);
            saveAppTheme(newTheme);
        },
        setMenu: (menu) => {
            state.menu.set(menu)
        },
        menu: completeMenu,
        simpleMenu: state.get({noproxy: true}).menu,
        activeMenu: state.get({noproxy: true}).activeMenu,
        isLoadingForeground: state.loading.value > 0,
        addLoadingForeground: () => { state.loading.set(state.loading.value + 1) },
        removeLoadingForeground: () => { state.loading.set(state.loading.value - 1) },
        isVisibleChangeProfilePictureDialog: state.isVisibleChangeProfilePictureDialog.value,
        toogleChangeProfilePictureDialog: (value) => { state.isVisibleChangeProfilePictureDialog.set(value) }
    };
};