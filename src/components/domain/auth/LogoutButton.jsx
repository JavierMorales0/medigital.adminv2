import AuthService from "@/services/AuthService.js";
import {Button} from "primereact/button";

const LogoutButton = ( )=> {

    const { logout} = AuthService();
    const handleClick = () => {
        logout();
    }

    return (<Button icon="pi pi-sign-in" rounded severity="danger" aria-label="Iniciar sesi&oacute;n" onClick={handleClick}/>)
}

export default LogoutButton