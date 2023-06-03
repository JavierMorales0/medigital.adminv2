import P14Regular from "@/components/ui/P14Regular.jsx";
import P12Light from "@/components/ui/P12Light.jsx";
import {Button} from "primereact/button";

const AppointmentCardBody = ({ appointment, style }) => {
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
                <Button icon="pi pi-file-edit" rounded text raised severity="warning" size='small'
                        aria-label="Mover a recepción" tooltip='Mover a recepción'
                        tooltipOptions={{position: 'bottom'}}/>
                <Button icon="pi pi-check" rounded text raised severity="success" size='small'
                        aria-label="Finalizar" tooltip='Finalizar'
                        tooltipOptions={{position: 'bottom'}}/>
            </div>
        </div>
    )
}

export default AppointmentCardBody;