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

    return{
        getAll,
        getAllToday,
        create
    }
}