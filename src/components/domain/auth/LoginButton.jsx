import {Button} from "primereact/button";
import AuthService from "@/services/AuthService.js";

const LoginButton = () => {
    const {login} = AuthService();
    const handleClick = () => {
        login.mutate({username: "javier.morales", password: "javier123"});
    }
    return (<Button icon="pi pi-sign-in" rounded aria-label="Iniciar sesi&oacute;n" onClick={handleClick}/>)
}

export default LoginButton