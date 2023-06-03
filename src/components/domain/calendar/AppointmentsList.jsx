import P16Bold from "@/components/ui/P16Bold.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";
import P14Regular from "@/components/ui/P14Regular.jsx";
import P12Light from "@/components/ui/P12Light.jsx";
import StatusAppointmentComponent from "@/components/domain/calendar/StatusAppointmentComponent.jsx";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {formatDistanceToNow} from "date-fns";
import AppointmentCardHeader from "@/components/domain/calendar/AppointmentCardHeader.jsx";
import AppointmentCardBody from "@/components/domain/calendar/AppointmentCardBody.jsx";

const AppointmentsList = ({appointments}) => {
    return (
        <div style={style.container}>
            {
                appointments?.map((appointment, index) => (
                    <div key={index} style={dynamicStyles(index)?.card}>
                        <img src={appointment?.booked_by?.avatar} alt="avatar" style={style.cardAvatar}
                             referrerPolicy='no-referrer'/>
                        <div style={style.cardContent}>
                            <AppointmentCardHeader appointment={appointment} style={style}/>
                            <Divider style={style.divider}/>
                            <AppointmentCardBody appointment={appointment} style={style}/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
const dynamicStyles = (index) => {
    return {
        card: {
            padding: '16px',
            borderRadius: '16px',
            backgroundColor: index % 2 === 0 && 'var(--highlight-bg)',
            border: index % 2 === 1 && '2px solid var(--highlight-bg)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
        }
    }
}
const style = {
    container: {
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '24px',
    },
    cardContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    cardAvatar: {
        width: '50px',
        borderRadius: '50%',
    },
    cardHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px',
        position: 'relative'
    },
    cardHeaderText: {textAlign: 'left', margin: 0, padding: 0, maxWidth: '80%', overflow: 'hidden', wordBreak: 'break-word'},
    divider: {padding: 0, margin: 0},
    cardBody: {
        width: '100%',
    },
    actions: {
        paddingTop: '8px',
        display: 'flex',
        justifyContent: 'center',
        gap: '16px'
    }
}

export default AppointmentsList;