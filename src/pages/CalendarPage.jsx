import Page from "@/pages/Page.jsx";
import {useAppointmentsState} from "@/hooks/AppointmentsState.js";
import AppointmentsService from "@/services/AppointmentsService.js";
import {Calendar, dateFnsLocalizer} from "react-big-calendar"
import {messages} from "@/utils/BigCalendarConfig.js";
import {format, getDay, parse, startOfWeek, subHours} from "date-fns";
import {es} from 'date-fns/locale'
import DialogAppointmentComponent from "@/components/domain/calendar/DialogAppointmentComponent.jsx";

const locales = {
    'es-ES': es
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})
const CalendarPage = () => {
    const {dataToSchedule} = AppointmentsService()
    const {
        temporalSelectedAppointment,
        setTemporalSelectedAppointment,
        visibleDialog,
        hideDialog,
        showDialog
    } = useAppointmentsState()

    const handleClickedAppointment = (appointment) => {
        setTemporalSelectedAppointment(appointment)
        showDialog()
    }

    const handleHideDialog = () => {
        setTemporalSelectedAppointment(null)
        hideDialog()
    }

    return (
        <Page title='Calendario'>
            <div style={style.container}>
                <Calendar
                    localizer={localizer}
                    events={dataToSchedule}
                    startAccessor="start"
                    endAccessor="end"
                    step={30}
                    timeslots={4}
                    onSelectEvent={handleClickedAppointment}
                    defaultView="week"
                    scrollToTime={subHours(new Date(), 1)}
                    messages={messages}
                />
            </div>
            <DialogAppointmentComponent visible={visibleDialog} appointment={temporalSelectedAppointment} handleHide={handleHideDialog}/>
        </Page>
    )
}

const style = {
    container: {
        width: '100%',
        padding: '16px 32px',
        height: '600px',
        maxWidth: '100%',
    },
}

export default CalendarPage;