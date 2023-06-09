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
        },
        text: {
            padding: 0,
            margin: 0,
            textTransform: 'lowercase'
        }
    }
    const content = (
        <>
            <P10SemiBold sx={style.text} color='--gray-900'>{APPOINTMENT_STATUS[status]}</P10SemiBold>
        </>
    )
    return (
        <Chip template={content} style={style.content}/>
    )
}


export default StatusAppointmentComponent;