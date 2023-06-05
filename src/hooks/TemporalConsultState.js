import {hookstate, useHookstate} from "@hookstate/core";

export const temporalConsultState = hookstate({
    date: new Date(),
    startHour: null,
    endHour: null,
    patientId: null,
    patientName: '',
    doctor: null,
    reason: '',
    physicalFindings: '',
    medicalRecord: '',
    diagnostic: [],
    prescriptions: [],
    observations: '',
    prevAppointment: null,
    status: null,
});

export const useTemporalConsultState = () => {
    const state = useHookstate(temporalConsultState);

    return {
        date: state.date.value,
        startHour: state.startHour.value,
        setStartHour: (hour) => state.startHour.set(hour),
        endHour: state.endHour.value,
        setEndHour: (hour) => state.endHour.set(hour),
        patientId: state.patientId.value,
        setPatientId: (id) => state.patientId.set(id),
        patientName: state.patientName.value,
        setPatientName: (name) => state.patientName.set(name),
        doctor: state.doctor.value,
        setDoctor: (doctor) => state.doctor.set(doctor),
        reason: state.reason.value,
        setReason: (reason) => state.reason.set(reason),
        physicalFindings: state.physicalFindings.value,
        setPhysicalFindings: (physicalFindings) => state.physicalFindings.set(physicalFindings),
        medicalRecord: state.medicalRecord.value,
        setMedicalRecord: (medicalRecord) => state.medicalRecord.set(medicalRecord),
        diagnostics: state.diagnostic.value,
        addDiagnostic: (diagnostic) => state.diagnostic.merge([diagnostic]),
        removeDiagnostic: (diagnostic) => state.diagnostic.merge((diagnostics) => diagnostics.filter((d) => d.uuid !== diagnostic.uuid)),
        prescriptions: state.prescriptions.value,
        addPrescription: (prescription) => state.prescriptions.merge([prescription]),
        removePrescription: (prescription) => state.prescriptions.merge((prescriptions) => prescriptions.filter((p) => p.uuid !== prescription.uuid)),
        observations: state.observations.value,
        setObservations: (observations) => state.observations.set(observations),
        prevAppointment: state.prevAppointment.value,
        setPrevAppointment: (prevAppointment) => state.prevAppointment.set(prevAppointment),
        status: state.status.value,
        setStatus: (status) => state.status.set(status),
        clear: () => {
            state.date.set(new Date());
            state.startHour.set(null);
            state.endHour.set(null);
            state.patientId.set(null);
            state.patientName.set('');
            state.doctor.set(null);
            state.reason.set('');
            state.physicalFindings.set('');
            state.medicalRecord.set('');
            state.diagnostic.set([]);
            state.prescriptions.set([]);
            state.observations.set('');
            state.prevAppointment.set(null);
            state.status.set(null);
        },
        isEmpty: () => {
            return !state.startHour.value && !state.endHour.value && !state.patientId.value && !state.patientName.value
                    && !state.doctor.value && !state.reason.value && !state.physicalFindings.value
                    && !state.medicalRecord.value && !state.diagnostic.value.length && !state.prescriptions.value.length
                    && !state.observations.value && !state.prevAppointment.value && !state.status.value;
        },
        fillDataWithPrevAppointment: ({_id, name, reason, observations}) => {
            state.prevAppointment.set(_id);
            state.patientName.set(name);
            state.reason.set(reason);
            state.observations.set(observations);
        },
    };
};