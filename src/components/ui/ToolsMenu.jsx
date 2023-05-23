import ToolsService from "@/services/ToolsService.js";
import {SlideMenu} from "primereact/slidemenu"

const ToolsMenu = () => {
    const tools = ToolsService();
    if (tools?.isLoading) {
        return (
            <div>Cargando...</div>
        )
    }
    if (tools?.error) {
        return (
            <div>asdads</div>
        )
    }

    return (
        <SlideMenu
            model={tools?.data}
            backLabel={'Volver'}
            backIcon={'pi pi-angle-left'}
            viewportHeight={250}
            style={{border: 'none', backgroundColor: 'transparent'}}
        />
    )
}

export default ToolsMenu;