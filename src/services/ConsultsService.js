import ConsultsRepository from "@/repositories/ConsultsRepository.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";

export default function ConsultsService(){
    const {
            getAll: _getAll,
            getAllToday: _getAllToday,
            create : _create,
            startSpecific: _startSpecific,
            cancelSpecific: _cancelSpecific
    } = ConsultsRepository();
    const temporalConsultState = useTemporalConsultState();
    const queryClient = useQueryClient();

    const {data: dataConsults, isLoading: isLoadingConsults} = useQuery({
        queryKey: ['consults'],
        queryFn: _getAll,
        refetchOnWindowFocus: false,
    })

    const {data: dataConsultsToday, isLoading: isLoadingConsultsToday} = useQuery({
        queryKey: ['consultsToday'],
        queryFn: _getAllToday,
        refetchOnWindowFocus: false,
    })

    const create = useMutation({
        mutationFn: _create,
        onSuccess: (data)=>{
            if(data.status === 201){
                temporalConsultState?.clear();
                queryClient.invalidateQueries({queryKey: ['consults']});
                queryClient.invalidateQueries({queryKey: ['consultsToday']});
            }
        },
        onError: (error)=>{
            console.log(error);
        }
    })

    const startSpecific = useMutation({
        mutationFn: _startSpecific,
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: ['consults']});
            queryClient.invalidateQueries({queryKey: ['consultsToday']});
        },
        onError: (error)=>{
            console.log(error);
        }
    })

    const cancelSpecific = useMutation({
        mutationFn: _cancelSpecific,
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: ['consults']});
            queryClient.invalidateQueries({queryKey: ['consultsToday']});
        },
        onError: (error)=>{
            console.log(error);
        }
    })

    return {
        dataConsults: dataConsults?.data,
        isLoadingConsults,
        dataConsultsToday: dataConsultsToday?.data,
        isLoadingConsultsToday,
        create,
        startSpecific,
        cancelSpecific
    }
}