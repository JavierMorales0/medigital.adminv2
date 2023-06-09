import ToogleThemeButton from "@/components/ui/ToogleThemeButton.jsx";
import AuthService from "@/services/AuthService.js";
import LoginButton from "@/components/domain/auth/LoginButton.jsx";
import P16Bold from "@/components/ui/P16Bold.jsx";
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Checkbox} from "primereact/checkbox";
import TextAction from "@/components/ui/TextAction.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";
import P16Regular from "@/components/ui/P16Regular.jsx";
import P14Regular from "@/components/ui/P14Regular.jsx";
import Page from "@/pages/Page.jsx";
import {Controller, useForm} from "react-hook-form";


const AuthPage = () => {
    const defaultValues = {
        username: '',
        password: '',
        rememberMe: false
    }
    const {control, formState: {errors}, handleSubmit, reset} = useForm({defaultValues});

    const {login} = AuthService();

    const handleForgotPassword = () => {
        console.log('forgot password')
    }

    const handleSubmitAuth = (data) => {
        login.mutate(data);
    }

    const handleCreateUser = () => {
        console.log('create user')
    }
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (<Page title='Autenticación'>
            <ToogleThemeButton hideLabel styleProp={style.button}/>
            <div style={style.container}>
                <form style={style.subcontainer} onSubmit={handleSubmit(handleSubmitAuth)} id='auth-form'>
                    <P16Bold color={'--highlight-text-color'}>
                        moME
                    </P16Bold>

                    <div>
                        <h4>Bienvenido a</h4>
                        <h1>MEDIGITAL.admin</h1>
                    </div>
                    <div style={style.inputContainer}>
                        <span className="p-float-label">
                            <Controller name="username" control={control} rules={{required: 'Usuario requerido'}}
                                        render={({field, fieldState}) => (
                                            <InputText id={field.name} style={{width: '100%'}} {...field}
                                                       keyfilter="alphanum"/>
                                        )}/>
                        <label htmlFor="username">Usuario</label>
                    </span>
                        {getFormErrorMessage('username')}

                    </div>
                    <div style={style.inputContainer}>
                        <span className="p-float-label">
                            <Controller name="password" control={control} rules={{required: 'Contraseña requerida'}}
                                        render={({field, fieldState}) => (
                                            <Password id={field.name} {...field}
                                                      feedback={false}/>
                                        )}/>
                        <label htmlFor="password">Contraseña</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                    <div style={style.actionsContainer}>
                        <div style={style.rememberMeContainer}>
                            <Controller name="rememberMe" control={control} render={({field, fieldState}) => (
                                <Checkbox
                                    inputId={field.name}
                                    onChange={(e) => field.onChange(e.checked)}
                                    checked={field.value}
                                />
                            )}/>
                            <label htmlFor="rememberMe" style={style.smallLabel}>Recuérdame</label>
                            {getFormErrorMessage('rememberMe')}
                        </div>
                        <TextAction
                            text={'¿Olvidaste tu contraseña?'}
                            action={handleForgotPassword}
                            fontSize='12px'
                            fontWeight='600'
                            color='--highlight-text-color'/>
                    </div>
                    <LoginButton fullWidth/>
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
                <div style={{
                    ...style.subcontainer,
                    maxWidth: '30vw',
                    alignItems: 'flex-start',
                    backgroundColor: 'var(--highlight-bg)',
                    padding: '16px 32px',
                    borderRadius: '16px'
                }}>
                    <h3>
                        Acerca de MEDIGITAL.admin
                    </h3>
                    <P16Regular>
                        Somos una plataforma de gestión de pacientes, que te permite tener un control de tus pacientes
                        de manera fácil y rápida. Utilizamos tecnología de punta para que puedas gestionar tus
                        actividades diarias de manera eficiente.
                    </P16Regular>
                    <div style={style.details}>
                        <h3 style={{margin: 0}}>Características</h3>
                        <ul>
                            <li style={style.list}><P14Regular>Control de pacientes</P14Regular></li>
                            <li style={style.list}><P14Regular>Control de consultas</P14Regular></li>
                            <li style={style.list}><P14Regular>Control de doctores</P14Regular></li>
                            <li style={style.list}><P14Regular>Control de citas</P14Regular></li>
                            <li style={style.list}><P14Regular>Control de historias clínicas</P14Regular></li>
                            <li style={style.list}><P14Regular>Control de recetas</P14Regular></li>
                            <li style={style.list}><P14Regular>Control de pagos</P14Regular></li>
                            <li style={style.list}><P14Regular>Control de reportes</P14Regular></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Page>

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
        minWidth: '25vw'
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
    }, list: {
        margin: 0, padding: 0
    }, details: {display: 'flex', flexDirection: 'column', width: '100%'}
}

export default AuthPage;