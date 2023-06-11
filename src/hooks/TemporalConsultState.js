import {hookstate, useHookstate} from "@hookstate/core";
import { format} from "date-fns";

export const temporalConsultState = hookstate({
    date: null,
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
        setDate: (date) => state.date.set(date),
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
        init: ()=>{
            state.date.set(format(new Date(), 'yyyy-MM-dd'));
        },
        clear: () => {
            state.date.set(null);
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
            return Object.values(state.get()).every((value) => value === null || value === '' || value.length === 0);
        },
        fillDataWithPrevAppointment: ({_id, name, reason, observations}) => {
            state.date.set(format(new Date(), 'yyyy-MM-dd'));
            state.prevAppointment.set(_id);
            state.patientName.set(name);
            state.reason.set(reason);
            state.observations.set(observations);
        },
    };
};