import ToogleThemeButton from "@/components/ui/ToogleThemeButton.jsx";
import {InputText} from "primereact/inputtext";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {AutoComplete} from "primereact/autocomplete";
import { useHookstate} from "@hookstate/core";

const NavbarContainer = () => {
    const search = useHookstate("")
    const handleComplete = () => {

    }
    return (<nav style={style.container}>
        <div style={style.actionsContainer}>
            <InputText
                placeholder="Buscar acciones"
                style={style.searchInput}
            />
            <AutoComplete placeholder="Buscar acciones" completeMethod={handleComplete} value={search.get()}
                          onChange={(e) => search.set(e.target.value)
                          }/>
            <Avatar label="JM" size="large" shape="square"/>
            <Button icon="pi pi-plus" aria-label="agregar consulta"/>
        </div>
        <div>
            <ToogleThemeButton hideLabel styleProp={style.themeButton}/>
        </div>
    </nav>)
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 16px',
        height: '64px',
        boxShadow: '0px 3px 28px -7px var(--highlight-bg)',
    },
    actionsContainer: {
        width: '75%',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    },
    searchInput: {
        flex: 1,
        marginRight: '16px'
    }, themeButton: {
        borderRadius: '100%',
    }
}

export default NavbarContainer;