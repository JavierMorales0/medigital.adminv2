import {hookstate, useHookstate} from "@hookstate/core";

export const appointmentsState = hookstate({
    specificDate: null,
    visibleDialog: false,
    temporalSelectedAppointment: null,
});

export const useAppointmentsState = () => {
    const state = useHookstate(appointmentsState);

    return {
        specificDate: state.specificDate.value,
        setSpecificDate: (date) => state.specificDate.set(date),
        visibleDialog: state.visibleDialog.value,
        hideDialog: () => state.visibleDialog.set(false),
        showDialog: () => state.visibleDialog.set(true),
        temporalSelectedAppointment: state.temporalSelectedAppointment.value,
        setTemporalSelectedAppointment: (appointment) => state.temporalSelectedAppointment.set(appointment),
    };
};