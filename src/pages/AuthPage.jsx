import ToogleThemeButton from "@/components/ui/ToogleThemeButton.jsx";
import AuthService from "@/services/AuthService.js";
import LoginButton from "@/components/domain/auth/LoginButton.jsx";
import P16Bold from "@/components/ui/P16Bold.jsx";
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Checkbox} from "primereact/checkbox";
import {useHookstate} from "@hookstate/core";
import TextAction from "@/components/ui/TextAction.jsx";
import {useRef} from "react";
import P12Regular from "@/components/ui/P12Regular.jsx";
import {ProgressSpinner} from "primereact/progressspinner";

const AuthPage = () => {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const {login} = AuthService();

    const rememberMe = useHookstate(false)

    const handleForgotPassword = () => {
        console.log('forgot password')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: usernameRef.current.value, password: passwordRef.current.getInput().value, rememberMe: rememberMe.value
        }
        login.mutate(formData);
    }

    const handleCreateUser = () => {
        console.log('create user')
    }

    return (<>
            <ToogleThemeButton hideLabel styleProp={style.button}/>
            <div style={style.container}>
                {
                    login.error && console.log(login.error.response.data.msg)
                }
                <form style={style.subcontainer} onSubmit={handleSubmit} id='auth-form'>
                    <P16Bold color={'--highlight-text-color'}>
                        moME
                    </P16Bold>

                    <div>
                        <h4>Bienvenido a</h4>
                        <h1>MEDIGITAL.admin</h1>
                    </div>
                    <div style={style.inputContainer}>
                        <span className="p-float-label">
                        <InputText id="username" style={{width: '100%'}} ref={usernameRef}/>
                        <label htmlFor="username">Usuario</label>
                    </span>

                    </div>
                    <div style={style.inputContainer}>
                        <span className="p-float-label">
                        <Password inputId="password" ref={passwordRef}
                                  feedback={false}/>
                        <label htmlFor="password">Contraseña</label>
                        </span>
                    </div>
                    <div style={style.actionsContainer}>
                        <div style={style.rememberMeContainer}>
                            <Checkbox
                                id="rememberMe"
                                onChange={(e) => rememberMe.set(e.checked)}
                                checked={rememberMe?.value}
                            />
                            <label htmlFor="rememberMe" style={style.smallLabel}>Recuérdame</label>
                        </div>
                        <TextAction
                            text={'¿Olvidaste tu contraseña?'}
                            action={handleForgotPassword}
                            fontSize='12px'
                            fontWeight='600'
                            color='--highlight-text-color'/>
                    </div>
                    <LoginButton onSubmit={handleSubmit} fullWidth/>
                    <P12Regular>
                        ¿No tienes una cuenta?
                        <TextAction text={'Comunícate con tu administrador'}
                                    fontSize='12px'
                                    type='span'
                                    color='--highlight-text-color'
                                    style={{marginLeft: '4px'}}
                                    action={handleCreateUser}/>
                    </P12Regular>
                </form>
                <div>

                </div>
            </div>
        </>

    )
}

const style = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    }, subcontainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '350px'
    }, button: {
        borderRadius: '100%', position: 'absolute', top: '16px', right: '16px'
    }, inputContainer: {
        marginTop: '20px', width: '100%'
    }, actionsContainer: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'
    }, smallLabel: {
        fontSize: '12px', marginLeft: '8px'
    }, rememberMeContainer: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    }
}

export default AuthPage;