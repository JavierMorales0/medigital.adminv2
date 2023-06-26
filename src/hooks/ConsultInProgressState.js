import {hookstate, useHookstate} from "@hookstate/core";

export const consultInProgressState = hookstate({
    _id: null,
    date: null,
    startHour: "",
    endHour: "",
    patient: "",
    doctor: "",
    reason: "",
    physicalFindings: "",
    medicalRecord: "",
    diagnostic: [],
    prescriptions: [],
    observations: "",
    prevAppointment: "",
    status: ""
});

export const useConsultInProgressState = () => {
    const state = useHookstate(consultInProgressState);

    return {
        _id: state._id.value,
        date: state.date.value,
        startHour: state.startHour.value,
        endHour: state.endHour.value,
        patient: state.patient.value,
        setPatient: (patient) => state.patient.set(patient),
        doctor: state.doctor.value,
        setDoctor: (doctor) => state.doctor.set(doctor),
        reason: state.reason.value,
        setReason: (reason) => state.reason.set(reason),
        physicalFindings: state.physicalFindings.value,
        setPhysicalFindings: (physicalFindings) => state.physicalFindings.set(physicalFindings),
        medicalRecord: state.medicalRecord.value,
        setMedicalRecord: (medicalRecord) => state.medicalRecord.set(medicalRecord),
        diagnostic: state.diagnostic.value,
        addDiagnostic: (diagnostic) => state.diagnostic.merge([diagnostic]),
        removeDiagnostic: (index) => state.diagnostic[index].set(null),
        prescriptions: state.prescriptions.value,
        addPrescription: (prescription) => state.prescriptions.merge([prescription]),
        removePrescription: (index) => state.prescriptions[index].set(null),
        observations: state.observations.value,
        setObservations: (observations) => state.observations.set(observations),
        prevAppointment: state.prevAppointment.value,
        setPrevAppointment: (prevAppointment) => state.prevAppointment.set(prevAppointment),
        status: state.status.value,
        fill: (consult) => {
            state._id.set(consult?._id);
            state.date.set(consult?.date);
            state.startHour.set(consult?.start_hour);
            state.endHour.set(consult?.end_hour);
            state.patient.set(consult?.patient?._id || consult?.patient);
            state.doctor.set(consult?.doctor?._id || consult?.doctor);
            state.reason.set(consult?.reason);
            state.physicalFindings.set(consult?.physical_finding);
            state.medicalRecord.set(consult?.medical_record);
            state.diagnostic.set(consult?.diagnostic);
            state.prescriptions.set(consult?.prescriptions);
            state.observations.set(consult?.observations);
            state.prevAppointment.set(consult?.prev_appointment);
            state.status.set(consult?.status);
        },
        isEmpty: () => {
            return Object.keys(state).every((key) => state[key].value === null || state[key].value === "" || state[key].value.length === 0);
        },
        clear: () => {
            state._id.set(null);
            state.date.set(null);
            state.startHour.set("");
            state.endHour.set("");
            state.patient.set("");
            state.doctor.set("");
            state.reason.set("");
            state.physicalFindings.set("");
            state.medicalRecord.set("");
            state.diagnostic.set([]);
            state.prescriptions.set([]);
            state.observations.set("");
            state.prevAppointment.set("");
            state.status.set("");
        }
    }
}