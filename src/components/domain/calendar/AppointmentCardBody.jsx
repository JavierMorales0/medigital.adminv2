import P14Regular from "@/components/ui/P14Regular.jsx";
import P12Light from "@/components/ui/P12Light.jsx";
import {Button} from "primereact/button";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";

const AppointmentCardBody = ({ appointment, style }) => {
    const temporalConsult = useTemporalConsultState()

    const handleCreateConsult = () => {
        temporalConsult?.clear()
        temporalConsult?.fillDataWithPrevAppointment(appointment)
    }
    return (
        <div style={style.cardBody}>
            <P14Regular>
                {appointment?.reason}
            </P14Regular>
            <P12Light>
                {appointment?.observations}
            </P12Light>
            <div style={style.actions}>
                <Button icon="pi pi-times" rounded text raised severity="danger" size='small'
                        aria-label="Cancelar" tooltip='Cancelar'
                        tooltipOptions={{position: 'bottom'}}/>
                <Button icon="pi pi-sign-in" rounded text raised severity="info" size='small'
                        aria-label="Mover a sala de espera" tooltip='Mover a sala de espera' onClick={handleCreateConsult}
                        tooltipOptions={{position: 'bottom'}}/>
            </div>
        </div>
    )
}

export default AppointmentCardBody;