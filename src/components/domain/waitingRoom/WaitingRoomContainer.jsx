import ConsultsService from "@/services/ConsultsService.js";
import TableWaitingRoom from "@/components/domain/waitingRoom/TableWaitingRoom.jsx";
import {useHookstate} from "@hookstate/core";
import {useMemo} from "react";
import {isSameDay, parseISO} from "date-fns";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";
import {getConsultInProgress} from "@/utils/LocalStorageUtils.js"
import {useUIState} from "@/hooks/UIState.js";

const sortOptions = [
    {label: "_id", value: "_id"},
    {label: "fecha", value: "date"},
    {label: "paciente", value: "patient.first_name"},
    {label: "médico", value: "doctor.employee.first_name"},
    {label: "estado", value: "status"},
];
const WaitingRoomContainer = () => {
    const {
        dataConsults: data,
        startSpecific,
        cancelSpecific,
        continueSpecific,
    } = ConsultsService();
    const sortOptionSelected = useHookstate(null);
    const filters = useHookstate({
        status: "WAITING",
        date: null,
        prevAppointment: false,
    });
    const temporalConsultState = useTemporalConsultState()
    const ui = useUIState()

    const processedData = useMemo(() => {
        if (!data) return [];
        let _data = [...data];
        return _data
            .filter((item) => {
                //* Se obtienen las claves de los filtros activos
                const activeFilters = Object.keys(filters?.get())?.filter((key) => {
                    return filters?.get()[key] !== null;
                });
                //* Si no hay filtros activos, se muestran todos los datos
                if (activeFilters.length === 0) return true;
                //* Se comprueba que el item cumpla con todos los filtros activos
                return activeFilters.every((key) => {
                    if (key === "date") {
                        return isSameDay(
                            parseISO(item?.[key]?.slice(0, 10)),
                            filters?.get()?.[key]
                        );
                    }
                    if (key === "prevAppointment") {
                        return filters?.get()?.[key] === true
                            ? item?.["prev_appointment"] !== null
                            : true;
                    }
                    if (key === "status") {
                        return item?.[key] === filters?.get()?.[key];
                    }
                });
            })
            .sort((a, b) => {
                if (sortOptionSelected?.value === "_id") {
                    return a?._id - b?._id;
                }
                if (sortOptionSelected?.value === "date") {
                    return a?.date - b?.date;
                }
                if (sortOptionSelected?.value === "patient.first_name") {
                    return a?.patient?.first_name.localeCompare(b?.patient?.first_name);
                }
                if (sortOptionSelected?.value === "doctor.employee.first_name") {
                    return a?.doctor?.employee?.first_name.localeCompare(
                        b?.doctor?.employee?.first_name
                    );
                }
                if (sortOptionSelected?.value === "status") {
                    return a?.status?.localeCompare(b?.status);
                }
            });
    }, [data, sortOptionSelected, filters]);

    const handleSort = (e) => {
        sortOptionSelected.set(e.value);
    };

    const handleFilter = (key, value) => {
        filters.merge({[key]: value});
    };

    const handleGoToConsult = (_id) => {
        //* Se verifica si no hay ya una consulta en curso
        const consultInProgress = getConsultInProgress();
        if (consultInProgress) {
            ui?.addNotification("Ya hay una consulta en curso", "error");
            return;
        }
        startSpecific.mutate(_id);
    };

    const handleCancelConsult = (_id) => {
        cancelSpecific.mutate(_id);
    };

    const handleContinueConsult = (_id) => {
        continueSpecific.mutate(_id);
    };

    const handleEditConsult = (consult) => {
        temporalConsultState?.loadExistingConsult(consult)
    }

    return (
        <section style={style.container}>
            <div style={style.table}>
                {data?.length !== 0 && (
                    <TableWaitingRoom
                        data={processedData}
                        sortOptionSelected={sortOptionSelected?.get()}
                        sortOptions={sortOptions}
                        handleSort={handleSort}
                        filters={filters?.get()}
                        handleFilter={handleFilter}
                        handleGoToConsult={handleGoToConsult}
                        handleCancelConsult={handleCancelConsult}
                        handleContinueConsult={handleContinueConsult}
                        handleEditConsult={handleEditConsult}
                    />
                )}
            </div>
        </section>
    );
};

const style = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    table: {
        width: "100%",
    },
};

export default WaitingRoomContainer;
