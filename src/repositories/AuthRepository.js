import API from '@/repositories/API';

export default  function AuthRepository(){
    const login = async (data)=>{
        return API.post('/users/auth', data)
    }

    return {
        login
    }
}