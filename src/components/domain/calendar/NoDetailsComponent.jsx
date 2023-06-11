import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import P10Regular from "@/components/ui/P10Regular.jsx";
import P16SemiBold from "@/components/ui/P16SemiBold.jsx";
import P14SemiBold from "@/components/ui/P14SemiBold.jsx";
import P14Regular from "@/components/ui/P14Regular.jsx";
import {Divider} from "primereact/divider";
import React from "react";
import {format, parseISO} from "date-fns";

const NoDetailsComponent = ({appointment}) => {
    const navigate = useNavigate()
    const handleClickCreatePatient = () => {
        navigate('/pacientes/nuevo')
    }
    return (
        <div style={style.container}>
            <P14SemiBold sx={style.text}>
                Ups! Parece que no hay información de este paciente
            </P14SemiBold>
            <P14Regular sx={style.text}>
                Para poder continuar, debes crear un paciente
            </P14Regular>
            <Button label="Crear paciente" size='small' type='button' severity='primary'
                    icon="pi pi-user-plus" iconPos="left" onClick={handleClickCreatePatient}/>
            <P10Regular>
                * Para poder crear una cita, es necesario que el paciente esté registrado
                debido a que la cita se asocia a un paciente.
            </P10Regular>
            <Divider/>
            <P16SemiBold sx={style.text}>
                Información de la cita
            </P16SemiBold>
            <div style={style.details}>
                <div>
                    <P10Regular sx={style.text}>
                        Nombre del paciente
                    </P10Regular>
                    <P16SemiBold sx={style.textValues}>
                        {appointment?.name} (DUI: {appointment?.dui || 'N/A'})
                    </P16SemiBold>
                </div>
                <div>
                    <P10Regular sx={style.text}>
                        ID de la cita
                    </P10Regular>
                    <P16SemiBold sx={style.textValues}>
                        {appointment?._id}
                    </P16SemiBold>
                </div>
            </div>
            <div style={style.details}>
                <div style={{minWidth: '250px'}}>
                    <P10Regular sx={style.text}>
                        Fecha y hora
                    </P10Regular>
                    <P16SemiBold sx={style.textValues}>
                        {format(parseISO(appointment?.date), 'PPP')} - {appointment?.hour}
                    </P16SemiBold>
                </div>
                <div>
                    <P10Regular sx={style.text}>
                        Motivo
                    </P10Regular>
                    <P16SemiBold sx={style.textValues}>
                        {appointment?.reason || 'Sin motivo'}
                    </P16SemiBold>
                </div>
                <div>
                    <P10Regular sx={style.text}>
                        Observaciones
                    </P10Regular>
                    <P16SemiBold sx={style.textValues}>
                        {appointment?.observations || 'Sin observaciones'}
                    </P16SemiBold>
                </div>


            </div>
        </div>
    )
}

const style = {
    text: {
        margin: '0',
    }, container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 16px',
    }, details: {display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'space-between', width: '100%'}
}

export default NoDetailsComponent;