import P16Bold from "@/components/ui/P16Bold.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";
import P14Regular from "@/components/ui/P14Regular.jsx";
import P12Light from "@/components/ui/P12Light.jsx";
import StatusAppointmentComponent from "@/components/domain/calendar/StatusAppointmentComponent.jsx";
import {Divider} from "primereact/divider";

const AppointmentsList = ({appointments}) => {
    return (
        <div style={style.container}>
            {
                appointments?.map((appointment, index) => (
                    <div key={index} style={dynamicStyles(index)?.card}>
                        <img src={appointment?.booked_by?.avatar} alt="avatar" style={style.cardAvatar}/>
                        <div style={style.cardContent}>
                            <div style={style.cardHeader}>
                                <P16Bold sx={style.cardHeaderText}>{appointment?.name} <StatusAppointmentComponent status={appointment?.status}/></P16Bold>
                                <P12Regular
                                    sx={style.cardHeaderText}>{appointment?.hour} - {appointment?.booked_by.email}</P12Regular>
                            </div>
                            <Divider style={style.divider}/>
                            <div style={style.cardBody}>
                                <P14Regular>
                                    {appointment?.reason}
                                </P14Regular>
                                <P12Light>
                                    {appointment?.observations}
                                </P12Light>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
const dynamicStyles = (index) =>{
    return{
        card:{
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
        width: '20%',
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
    cardHeaderText: {textAlign: 'left', margin: 0, padding: 0, maxWidth: '80%', overflow: 'hidden'},
    divider: {padding: 0, margin: 0},
    cardBody: {
        width: '100%',
    }
}

export default AppointmentsList;