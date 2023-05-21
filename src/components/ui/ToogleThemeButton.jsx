import {THEMES} from '@/config'
import {ToggleButton} from 'primereact/togglebutton';
import {useUIState} from "@/hooks/UIState.js";

const ToogleThemeButton = () => {
    const ui = useUIState()

    const handleChange = () => {
        ui.toogleTheme()
    }
    return (
        <ToggleButton
            checked={ui.appTheme === THEMES.DARK}
            onChange={handleChange}
            onIcon="pi pi-moon"
            offIcon="pi pi-sun"
            onLabel="Oscuro"
            offLabel="Claro"
            style={style.button}
        />
    )
}

const style = {
    button: {
        cursor: 'pointer'
    }
}
export default ToogleThemeButton