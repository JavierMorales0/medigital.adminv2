import Page from "@/pages/Page.jsx";
import {Calendar} from "primereact/calendar";
import {useHookstate} from "@hookstate/core";
import {format} from "date-fns"
import {useEffect, useMemo} from "react";
import P16Bold from "@/components/ui/P16Bold.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";
import {useAppointmentsState} from "@/hooks/AppointmentsState.js";
import AppointmentsService from "@/services/AppointmentsService.js";
import AppointmentsList from "@/components/domain/calendar/AppointmentsList.jsx";
import P16Regular from "@/components/ui/P16Regular.jsx";

const CalendarPage = () => {
    const minDate = useHookstate(new Date())
    const {setSpecificDate, specificDate} = useAppointmentsState()
    const {data: appointments} = AppointmentsService()

    useEffect(() => {
        setSpecificDate(new Date())
    }, [])

    const handleChangeCalendar = (e) => {
        setSpecificDate(e.value)
    }


    const dayOfWeekFormat = useMemo(() => {
        if (!specificDate) return ''
        return format(specificDate, 'EEEE')?.toUpperCase()
    }, [specificDate])

    const restOfDateFormat = useMemo(() => {
        if (!specificDate) return ''
        return `${format(specificDate, 'dd')} de ${format(specificDate, 'MMMM')}`
    }, [specificDate])

    return (
        <Page title='Calendario'>
            <div style={style.container}>
                <div style={style.calendar}>
                    <Calendar
                        value={specificDate}
                        inline
                        showWeek
                        minDate={minDate.get()}
                        onChange={handleChangeCalendar}
                        style={{width: '100%'}}
                    />
                </div>

                <div style={style.subcontainer}>
                    <div style={style.headerContainer}>
                        <div style={style.cardDate}>
                            <P16Bold sx={{margin: 0}}>{dayOfWeekFormat}</P16Bold>
                            <P12Regular sx={{margin: 0}}>{restOfDateFormat}</P12Regular>
                        </div>
                        <P16Regular sx={{width: '300px'}}>Tienes {appointments?.length} cita(s) programada(s)</P16Regular>
                    </div>
                    <div style={style.listContainer}>
                        <AppointmentsList appointments={appointments}/>
                    </div>
                </div>
            </div>
        </Page>
    )
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px'
    }, subcontainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    calendar: {
        width: '500px'
    },
    cardDate: {
        border: '2px solid var(--highlight-bg)',
        padding: '16px',
        borderRadius: '16px',
        width: '200px',
        // marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    }, headerContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    }, listContainer: {}
}

export default CalendarPage;