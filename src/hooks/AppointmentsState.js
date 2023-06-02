import {hookstate, useHookstate} from "@hookstate/core";

export const appointmentsState = hookstate({
    specificDate: null,
});

export const useAppointmentsState = () => {
    const state = useHookstate(appointmentsState);

    return {
        specificDate: state.specificDate.value,
        setSpecificDate: (date) => state.specificDate.set(date),
    };
};