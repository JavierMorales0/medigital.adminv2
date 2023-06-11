import API from '@/repositories/API';

export default function PatientsRepository() {
    const getPatients = async () => {
        return API.get(`/patients`)
    }

    const getAllInfoSpecificPatient = async (dui) => {
        return API.get(`/patients/all-info/${dui}`)
    }

    return {
        getPatients,
        getAllInfoSpecificPatient
    }
}