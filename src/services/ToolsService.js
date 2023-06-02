import {useQuery} from "@tanstack/react-query";
import ToolsRepository from "@/repositories/ToolsRepository.js";
import {useNavigate} from "react-router-dom";
import {useUIState} from "@/hooks/UIState.js";
import {useEffect} from "react";

export default function ToolsService() {
    const navigate = useNavigate()
    const ui = useUIState();
    const {getTools: _getTools} = ToolsRepository();

    const {data, isLoading, isError, isFetching, refetch} = useQuery({
        queryKey: ['tools'],
        queryFn: _getTools,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if(!data?.data?.length) return;
        ui?.setMenu(data?.data?.map(({url, ...tool}) => {
            //* If its a parent category, it has no event
            if(tool.items){
                return {...tool, path: ''}
            }
            return {
                ...tool, command: () => {
                    navigate(url)
                },
                path: url ?? ''
            }
        }))
    }, [data?.data])


    return {
        data: data?.data,
        isLoading,
        isError,
        isFetching,
        refetch
    }
}