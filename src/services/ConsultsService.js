import ConsultsRepository from "@/repositories/ConsultsRepository.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";

export default function ConsultsService(){
    const { getAllToday: _getAllToday, create : _create} = ConsultsRepository();
    const temporalConsultState = useTemporalConsultState();

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
            }
        },
        onError: (error)=>{
            console.log(error);
        }
    })

    return {
        dataConsultsToday: dataConsultsToday?.data,
        isLoadingConsultsToday,
        create
    }
}