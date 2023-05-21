import AuthRepository from '@/repositories/AuthRepository';
import {useMutation} from "@tanstack/react-query";
import { saveToken, removeToken} from "@/utils/LocalStorageUtils.js";

export default function AuthService (){
    const { login : _login } = AuthRepository();

    const login = useMutation({
        mutationFn: _login,
        onSuccess: (data)=>{
            saveToken(data.data.credential)
        }
    })

    const logout = ()=>{
        removeToken();
    }

    return {
        login,
        logout
    }
}