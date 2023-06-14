import AppointmentsRepository from "@/repositories/AppointmentsRepository.js";
import {useQuery} from "@tanstack/react-query";
import {format, parse, addMinutes} from "date-fns";
import {useAppointmentsState} from "@/hooks/AppointmentsState.js";
import {useMemo} from "react";

export default function AppointmentsService() {

    const {getAppointments} = AppointmentsRepository();
    const {specificDate: date} = useAppointmentsState();
    const {data, isLoading, refetch} = useQuery({
        queryKey: ["appointments"],
        queryFn: () => getAppointments(),
        refetchOnWindowFocus: false,
    })

    const dataToSchedule = useMemo(()=>data?.data?.map((appointment) => {
        const startHour = parse(appointment?.date.slice(0,10) + " " + appointment?.hour, "yyyy-MM-dd HH:mm", new Date());
        return {
            _id: appointment._id,
            title: appointment.reason + " - " + appointment.name,
            start: startHour,
            end: addMinutes(startHour, 30),
            allDay: false,
            reason: appointment.reason,
            name: appointment.name,
            resource: appointment,

        }
    }), [data?.data])

    return {
        data: data?.data,
        dataToSchedule,
        isLoading,
        refetch
    }
}
