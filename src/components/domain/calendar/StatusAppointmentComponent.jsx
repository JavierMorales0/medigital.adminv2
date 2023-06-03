import {Chip} from "primereact/chip";
import {APPOINTMENT_STATUS} from "@/config/index.js";
import P10SemiBold from "@/components/ui/P10SemiBold.jsx";

const StatusAppointmentComponent = ({status}) => {
    const style = {
        content: {
            backgroundColor: APPOINTMENT_STATUS[status] === APPOINTMENT_STATUS.PENDING ? 'var(--green-200)' :
                APPOINTMENT_STATUS[status] === APPOINTMENT_STATUS.CANCELED ? 'var(--red-200)' :
                    APPOINTMENT_STATUS[status] === APPOINTMENT_STATUS.FINISHED ? 'var(--blue-200)' :
                        APPOINTMENT_STATUS[status] === APPOINTMENT_STATUS.IN_PROGRESS ? 'var(--yellow-200)' : 'var(--green-200)',
            padding: '4px 8px',
            position: 'absolute',
            top: '0',
            right: '0',
            zIndex: '1',
        },
        text: {
            padding: 0,
            margin: 0,
        }
    }
    const content = (
        <>
            <P10SemiBold sx={style.text}>{APPOINTMENT_STATUS[status]}</P10SemiBold>
        </>
    )
    return (
        <Chip template={content} style={style.content}/>
    )
}


export default StatusAppointmentComponent;