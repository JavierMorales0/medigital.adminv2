import API from '@/repositories/API';

export default function AppointmentsRepository() {
    const getAppointments = async (date) => {
        return API.get(`/appointments?date=${date}`, {background: true})
    }

    return {
        getAppointments
    }
}