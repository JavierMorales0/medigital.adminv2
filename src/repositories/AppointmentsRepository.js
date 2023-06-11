import API from '@/repositories/API';

export default function AppointmentsRepository() {
    const getAppointments = async () => {
        return API.get(`/appointments`)
    }

    return {
        getAppointments
    }
}