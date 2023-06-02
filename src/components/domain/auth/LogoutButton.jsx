import AuthService from "@/services/AuthService.js";
import {Button} from "primereact/button";

const LogoutButton = ( )=> {

    const { logout} = AuthService();
    const handleClick = () => {
        logout();
    }

    return (<Button
                icon="pi pi-sign-in"
                rounded
                severity="secondary"
                aria-label="Iniciar sesi&oacute;n"
                onClick={handleClick}
                label='Cerrar sesi&oacute;n'
                iconPos="right"
    />)
}

export default LogoutButton