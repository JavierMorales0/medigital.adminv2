import ConsultsRepository from "@/repositories/ConsultsRepository.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";
import {useUIState} from "@/hooks/UIState.js";
import {useConsultInProgressState} from "@/hooks/ConsultInProgressState.js";
import {useLocation, useNavigate} from "react-router-dom";
import {getConsultInProgress, removeConsultInProgress, saveConsultInProgress} from "@/utils/LocalStorageUtils.js";

export default function ConsultsService() {
    const {
        getAll: _getAll,
        getAllToday: _getAllToday,
        create: _create,
        update: _update,
        startSpecific: _startSpecific,
        cancelSpecific: _cancelSpecific,
        continueSpecific: _continueSpecific,
    } = ConsultsRepository();
    const temporalConsultState = useTemporalConsultState();
    const consultInProgressState = useConsultInProgressState();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const ui = useUIState();
    const {pathname} = useLocation()

    const {data: dataConsults, isLoading: isLoadingConsults} = useQuery({
        queryKey: ["consults"],
        queryFn: _getAll,
        refetchOnWindowFocus: false,
    });

    const {data: dataConsultsToday, isLoading: isLoadingConsultsToday} =
        useQuery({
            queryKey: ["consultsToday"],
            queryFn: _getAllToday,
            refetchOnWindowFocus: false,
        });

    const create = useMutation({
        mutationFn: _create,
        onSuccess: ({data, status}) => {
            if (status === 201) {
                ui?.addNotification(`Creada '${data?.reason}'`, "success");
                temporalConsultState?.clear();
                queryClient.invalidateQueries({queryKey: ["consults"]});
                queryClient.invalidateQueries({queryKey: ["consultsToday"]});
            }
        },
        onError: (error) => {
            ui?.addNotification(error.msg, "error");
        },
    });

    const update = useMutation({
        mutationFn: _update,
        onSuccess: ({data, status}) => {
            if (status === 200) {
                ui?.addNotification(`Actualizada '${data?.reason}'`, "success");
                temporalConsultState?.clear();
                queryClient.invalidateQueries({queryKey: ["consults"]});
                queryClient.invalidateQueries({queryKey: ["consultsToday"]});
            }
        },
        onError: (error) => {
            ui?.addNotification(error.msg, "error");
        }
    });

    const startSpecific = useMutation({
        mutationFn: _startSpecific,
        onSuccess: ({data}) => {
            ui?.addNotification(`Iniciada la consulta ${data?._id}`, "success");
            queryClient.invalidateQueries({queryKey: ["consults"]});
            queryClient.invalidateQueries({queryKey: ["consultsToday"]});
            consultInProgressState?.fill(data)
            saveConsultInProgress(data);
            navigate(`/consultorio`);
        },
        onError: (error) => {
            ui?.addNotification(error.msg, "error");
        },
    });

    const cancelSpecific = useMutation({
        mutationFn: _cancelSpecific,
        onSuccess: ({data}) => {
            ui?.addNotification(`Cancelación de '${data?.reason}'`, "success");
            queryClient.invalidateQueries({queryKey: ["consults"]});
            queryClient.invalidateQueries({queryKey: ["consultsToday"]});
            //* Verifica si la consulta cancelada es la que está en progreso
            const consultInProgress = getConsultInProgress();
            if (consultInProgress?._id === data?._id) {
                consultInProgressState?.clear();
                removeConsultInProgress();
                if (pathname !== "/sala-de-espera") navigate(`/sala-de-espera`);
            }
        },
        onError: (error) => {
            ui?.addNotification(error.msg, "error");
        },
    });

    const continueSpecific = useMutation({
        mutationFn: _continueSpecific,
        onSuccess: ({data}) => {
            ui?.addNotification(`Reapertura de '${data?.reason}'`, "success");
            queryClient.invalidateQueries({queryKey: ["consults"]});
            queryClient.invalidateQueries({queryKey: ["consultsToday"]});
        },
        onError: (error) => {
            ui?.addNotification(error.msg, "error");
        },
    });

    return {
        dataConsults: dataConsults?.data,
        isLoadingConsults,
        dataConsultsToday: dataConsultsToday?.data,
        isLoadingConsultsToday,
        create,
        update,
        startSpecific,
        cancelSpecific,
        continueSpecific,
    };
}
