import {Button} from "primereact/button";

const LoginButton = ({hideLabel = false, fullWidth = false, rounded = false}) => {

    return (<Button icon="pi pi-sign-in" aria-label="Iniciar sesion"
                    rounded={rounded}
                    iconPos='right'
                    form='auth-form'
                    type='submit'
                    label={!hideLabel && "Iniciar sesion"}
                    style={{width: fullWidth && '100%'}}
                    />)
}

export default LoginButton