import API from '@/repositories/API';
import {format} from "date-fns";

export default function ConsultsRepository() {

    const getAll = async  ()=>{
        return API.get('/consults')
    }
    const getAllToday = async () => {
        return API.get('/consults?date=' + format(new Date(), 'yyyy-MM-dd'))
    }
    const create = async (data) => {
        return API.post('/consults', data)
    }

    const startSpecific = async (_id) => {
        return API.put('/consults/' + _id + '/start-specific')
    }

    const cancelSpecific = async (_id) => {
        return API.put('/consults/' + _id + '/cancel-specific')
    }

    return{
        getAll,
        getAllToday,
        create,
        startSpecific,
        cancelSpecific
    }
}