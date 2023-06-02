import {useMutation, useQuery} from "@tanstack/react-query";
import UsersRepository from "@/repositories/UsersRepository.js";
import {updateProfilePicture} from "@/utils/LocalStorageUtils.js";
import {useUIState} from "@/hooks/UIState.js";

export default function UsersService() {
    const {changeProfilePicture: _changeProfilePicture, getOwnInfo: _getOwnInfo} = UsersRepository();
    const {toogleChangeProfilePictureDialog} = useUIState();

    const changeProfilePicture = useMutation({
        mutationFn: _changeProfilePicture,
        onSuccess: ({data}) => {
            const profilePicture = data?.profile_picture;
            updateProfilePicture(profilePicture)
            toogleChangeProfilePictureDialog(false)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const {data: dataOwnInfo, isLoading: isLoadingOwnInfo, isFetching: isFetchingOwnInfo} = useQuery({
        queryKey: ['own-info'],
        queryFn: _getOwnInfo,
        refetchOnWindowFocus: false,
        staleTime: 'infinity'
    })

    return {
        changeProfilePicture,
        ownInfo: dataOwnInfo?.data,
        isLoadingOwnInfo: isLoadingOwnInfo || isFetchingOwnInfo
    }
}