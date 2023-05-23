import {THEMES} from '@/config'
import {ToggleButton} from 'primereact/togglebutton';
import {useUIState} from "@/hooks/UIState.js";

const ToogleThemeButton = ({hideLabel = false, styleProp = null}) => {
    const ui = useUIState()

    const handleChange = () => {
        ui.toogleTheme()
    }
    return (
        <ToggleButton
            checked={ui.appTheme === THEMES.DARK}
            onChange={handleChange}
            onLabel={hideLabel ? '' : 'Oscuro'}
            offLabel={hideLabel ? '' : 'Claro'}
            onIcon="pi pi-moon"
            offIcon="pi pi-sun"
            style={styleProp ?? style.button}
        />
    )
}

const style = {
    button: {
        cursor: 'pointer'
    }
}
export default ToogleThemeButton