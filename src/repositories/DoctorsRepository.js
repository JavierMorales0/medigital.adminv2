import API from '@/repositories/API';

export default function DoctorsRepository() {
    const getDoctors = async () => {
        return API.get(`/doctors`)
    }

    return {
        getDoctors
    }
}