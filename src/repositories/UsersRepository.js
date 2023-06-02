import API from '@/repositories/API';

export default function UsersRepository() {
    const changeProfilePicture = async (data)=>{
        return API.post('/users/change-profile-picture', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    const getOwnInfo = async ()=>{
        return API.get('/users/own-info', { background: true});
    }

    return {
        changeProfilePicture,
        getOwnInfo
    }
}