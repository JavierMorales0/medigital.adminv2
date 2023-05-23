import AuthRepository from '@/repositories/AuthRepository';
import {useMutation} from "@tanstack/react-query";
import { saveToken, removeToken} from "@/utils/LocalStorageUtils.js";
import { useNavigate} from "react-router-dom";

export default function AuthService (){
    const navigate = useNavigate();
    const { login : _login } = AuthRepository();

    const login = useMutation({
        mutationFn: _login,
        onSuccess: (data)=>{
            saveToken(data.data.credential)
            navigate("/dashboard", { replace: true })
        }
    })

    const logout = ()=>{
        removeToken();
        navigate("/login", { replace: true })
    }

    return {
        login,
        logout
    }
}