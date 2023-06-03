import P16Bold from "@/components/ui/P16Bold.jsx";
import StatusAppointmentComponent from "@/components/domain/calendar/StatusAppointmentComponent.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";
import {useHookstate} from "@hookstate/core";
import {useEffect} from "react";
import {formatDistanceToNow, parse} from "date-fns";
import P10Regular from "@/components/ui/P10Regular.jsx";
import P14SemiBold from "@/components/ui/P14SemiBold.jsx";

const AppointmentCardHeader = ({appointment, style}) => {

    const timeRemaining = useHookstate(null)

    useEffect(() => {

        const date = parse(appointment?.date?.split('T')[0] + ' ' + appointment?.hour, 'yyyy-MM-dd HH:mm', new Date())
        timeRemaining.set(formatDistanceToNow(date, {includeSeconds: true, addSuffix: true}))
        // const interval = setInterval(() => {
        //     const date = parse(appointment?.date?.split('T')[0] + ' ' + appointment?.hour, 'yyyy-MM-dd HH:mm', new Date())
        //     timeRemaining.set(formatDistanceToNow(date, {includeSeconds: true, addSuffix: true}))
        // }, 1000)
        //
        // return () => {
        //     clearInterval(interval)
        // }
    }, [])

    return (
        <div style={style.cardHeader}>
            <StatusAppointmentComponent status={appointment?.status}/>
            <P16Bold sx={style.cardHeaderText}>{appointment?.name} </P16Bold>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                <div style={{flex: 1}}>
                    <P14SemiBold sx={style.cardHeaderText} className='first-letter-uppercase'>
                        {timeRemaining.get()}
                    </P14SemiBold>
                    <P12Regular sx={style.cardHeaderText}>
                        {appointment?.hour}
                    </P12Regular>
                </div>
                {/*<P12Regular*/}
                {/*    sx={style.cardHeaderText}>{appointment?.hour}</P12Regular>*/}
                <P10Regular sx={style.cardHeaderText}><a
                    href={`mailto: ${appointment?.booked_by.email}`}>{appointment?.booked_by.email}</a></P10Regular>
            </div>

        </div>
    )
}
export default AppointmentCardHeader;