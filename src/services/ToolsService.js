import {useQuery} from "@tanstack/react-query";
import ToolsRepository from "@/repositories/ToolsRepository.js";

export default function ToolsService() {
    const {getTools: _getTools} = ToolsRepository();

    const {data, isLoading, isError, isFetching, refetch} = useQuery({
        queryKey: ['tools'],
        queryFn: _getTools,
        refetchOnWindowFocus: false,
    })

    return {
        data: data?.data,
        isLoading,
        isError,
        isFetching,
        refetch
    }
}