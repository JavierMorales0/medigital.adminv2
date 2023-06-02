import AppointmentsRepository from "@/repositories/AppointmentsRepository.js";
import {useQuery} from "@tanstack/react-query";
import {format} from "date-fns";
import {useAppointmentsState} from "@/hooks/AppointmentsState.js";

export default function AppointmentsService() {

    const {getAppointments} = AppointmentsRepository();
    const {specificDate: date} = useAppointmentsState();
    const {data, isLoading} = useQuery({
        queryKey: ["appointments", date],
        queryFn: () => getAppointments(format(date, "yyyy-MM-dd")),
        enabled: !!date,
    })

    return {
        data: data?.data,
        isLoading
    }
}
