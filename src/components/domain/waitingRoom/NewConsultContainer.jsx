import ButtonCancelEditModeWaitingRoom from "@/components/domain/waitingRoom/ButtonCancelEditModeWaitingRoom.jsx";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {InputText} from "primereact/inputtext";
import P16SemiBold from "@/components/ui/P16SemiBold.jsx";
import {format, parse} from "date-fns";
import P14Regular from "@/components/ui/P14Regular.jsx";
import P16Bold from "@/components/ui/P16Bold.jsx";


const NewConsultContainer = () => {
    const temporalConsult = useTemporalConsultState()
    const navigate = useNavigate()

    useEffect(() => {
        //* Verifica que exista una consulta temporal, si no existe redirige a la sala de espera
        if (temporalConsult?.isEmpty()){
            temporalConsult?.init()
        }
        return () => {
            //* Limpia la consulta temporal al salir de la página
            temporalConsult?.clear()
        }
    }, [])
    const handleClickExit = () => {
        temporalConsult?.clear()
        navigate('/sala-de-espera')
    }
    return (
        <form style={style.container}>
            <ButtonCancelEditModeWaitingRoom handleClickExit={handleClickExit}/>
            <div style={style.subcontainerLeft}>
                <div className="form-group">
                    <span className="p-float-label">
                        <InputText id="username" value={temporalConsult?.patientName} onChange={(e) => temporalConsult?.setPatientName(e.target.value)} />
                        <label htmlFor="username">Paciente</label>
                    </span>
                </div>
            </div>
            <div style={style.subcontainerRight}>
                {
                    temporalConsult?.date && (
                        <P16Bold sx={{margin: 0}} color='--highlight-text-color'>
                            {format(parse(temporalConsult?.date, 'yyyy-MM-dd', new Date()), 'EEEE dd  MMMM / yyyy')}
                        </P16Bold>)
                }
                {
                    temporalConsult?.prevAppointment && (<P14Regular sx={{margin:0}}>Cita previa: {temporalConsult?.prevAppointment}</P14Regular>)
                }
            </div>
        </form>
    )
}
const style = {
    container: {
        display: 'flex',
        gap: '32px',
        padding: '4px 32px'
    },
    subcontainerLeft: {
        flex: 1,
        paddingTop: '32px',
    },
    subcontainerRight: {
        backgroundColor: 'var(--highlight-bg)',
        width: '400px',
        padding: '16px',
        borderRadius: '16px'
    },
}
export default NewConsultContainer;