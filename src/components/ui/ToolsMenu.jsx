import {SlideMenu} from "primereact/slidemenu"
import {useUIState} from "@/hooks/UIState.js";

const ToolsMenu = () => {
    const ui = useUIState()

    return (
        <SlideMenu
            model={ui?.menu}
            backLabel={'Volver'}
            backIcon={'pi pi-angle-left'}
            viewportHeight={300}
            style={{border: 'none', backgroundColor: 'transparent'}}
        />
    )
}

export default ToolsMenu;