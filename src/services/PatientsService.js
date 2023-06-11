import {useQuery} from "@tanstack/react-query";
import PatientsRepository from "@/repositories/PatientsRepository.js";
import {useAppointmentsState} from "@/hooks/AppointmentsState.js";

export default function PatientsService() {
    const {getPatients, getAllInfoSpecificPatient} = PatientsRepository();
    const {
        temporalSelectedAppointment,
    } = useAppointmentsState()

    const {data: dataPatients, isLoading: isLoadingPatients} = useQuery({
        queryKey: ["patients"],
        queryFn: () => getPatients(),
        refetchOnWindowFocus: false,
    });

    const {data: dataAllInfoSpecificPatient, isLoading: isLoadingAllInfoSpecificPatient} = useQuery({
        queryKey: ["all-info-specific-patient", temporalSelectedAppointment?.resource?.dui],
        queryFn: () => getAllInfoSpecificPatient(temporalSelectedAppointment?.resource?.dui),
        refetchOnWindowFocus: false,
        enabled: !!temporalSelectedAppointment?.resource?.dui,
        staleTime: 1000 * 60 * 60 * 24 // 24 hours
    })


    return {
        dataPatients: dataPatients?.data,
        isLoadingPatients,
        dataAllInfoSpecificPatient: dataAllInfoSpecificPatient?.data,
        isLoadingAllInfoSpecificPatient
    };
}