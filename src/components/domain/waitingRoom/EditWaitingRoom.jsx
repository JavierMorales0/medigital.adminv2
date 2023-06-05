import P16Regular from "@/components/ui/P16Regular.jsx";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";
import {Button} from "primereact/button";

const EditWaitingRoom = () => {
    const temporalConsult = useTemporalConsultState()

    const handleClickExit = () => {
        temporalConsult?.clear()
    }

    return (
        <>
            <Button icon="pi pi-sign-out" rounded text raised severity="danger" size='small' label='Salir de edición'
                    onClick={handleClickExit} aria-label="Salir de edición" tooltip='Salir de edición'
            />
            <P16Regular>
                {temporalConsult?.patientName}
            </P16Regular>
        </>
    )
}

export default EditWaitingRoom;