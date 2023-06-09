import {hookstate, useHookstate} from "@hookstate/core";
import { format} from "date-fns";

export const temporalConsultState = hookstate({
    _id: null,
    date: null,
    startHour: null,
    endHour: null,
    patient: '',
    doctor: '',
    reason: '',
    physicalFindings: '',
    medicalRecord: '',
    diagnostic: [],
    prescriptions: [],
    observations: '',
    prevAppointment: '',
    status: null,
    isBlockPrevAppointment: null,
    isEditing: null,
});

export const useTemporalConsultState = () => {
    const state = useHookstate(temporalConsultState);

    return {
        _id: state._id.value,
        setID: (_id) => state._id.set(_id),
        date: state.date.value,
        setDate: (date) => state.date.set(date),
        startHour: state.startHour.value,
        setStartHour: (hour) => state.startHour.set(hour),
        endHour: state.endHour.value,
        setEndHour: (hour) => state.endHour.set(hour),
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
        isBlockPrevAppointment: state.isBlockPrevAppointment.value,
        isEditing: state.isEditing.value,
        setIsBlockPrevAppointment: (block) => state.isBlockPrevAppointment.set(block),
        init: ()=>{
            state.date.set(format(new Date(), 'yyyy-MM-dd'));
        },
        clear: () => {
            state._id.set(null);
            state.date.set(null);
            state.startHour.set(null);
            state.endHour.set(null);
            state.patient.set('');
            state.doctor.set('');
            state.reason.set('');
            state.physicalFindings.set('');
            state.medicalRecord.set('');
            state.diagnostic.set([]);
            state.prescriptions.set([]);
            state.observations.set('');
            state.prevAppointment.set('');
            state.status.set(null);
            state.isBlockPrevAppointment.set(null);
            state.isEditing.set(null);
        },
        isEmpty: () => {
            return Object.values(state.get()).every((value) => value === null || value === '' || value.length === 0);
        },
        fillDataWithPrevAppointment: ({_id, patient, reason, observations}) => {
            state.date.set(format(new Date(), 'yyyy-MM-dd'));
            state.prevAppointment.set(_id);
            state.patient.set(patient);
            state.reason.set(reason);
            state.observations.set(observations);
            state.isBlockPrevAppointment.set(true);
        },
        createObjectForServer: () => {
            const data = state.get();
            return {
                _id: data._id || null,
                date: data.date,
                patient: data.patient,
                reason: data.reason,
                observations: data.observations,
                prevAppointment: data.prevAppointment,
                doctor: data.doctor,
            }
        },
        validateCreateObjectForServer: () => {
            const data = state.get();
            if (data.date === null || data.date === '') {
                return {
                    msg: 'La fecha es requerida',
                    status: false,
                };
            }
            if (data.patient === null || data.patient === '' || data.patient.length !== 24) {
                return {
                    msg: 'El paciente es requerido y debe ser un ID válido',
                    status: false,
                }
            }
            if (data.reason === null || data.reason === '') {
                return {
                    msg: 'El motivo es requerido',
                    status: false,
                }
            }
            if (data.doctor === null || data.doctor === '' || data.doctor.length !== 24) {
                return {
                    msg: 'El doctor es requerido y debe ser un ID válido',
                    status: false,
                }
            }
            return {
                msg: '',
                status: true,
            }

        },
        loadExistingConsult: (consult) => {
            state._id.set(consult?._id);
            state.date.set(consult?.date.slice(0, 10));
            state.startHour.set(consult?.startHour);
            state.endHour.set(consult?.endHour);
            state.patient.set(consult?.patient?._id);
            state.doctor.set(consult?.doctor?._id);
            state.reason.set(consult?.reason);
            state.physicalFindings.set(consult?.physicalFindings);
            state.medicalRecord.set(consult?.medicalRecord);
            state.diagnostic.set(consult?.diagnostic);
            state.prescriptions.set(consult?.prescriptions);
            state.observations.set(consult?.observations);
            state.prevAppointment.set(consult?.prev_appointment?._id || '');
            state.status.set(consult?.status);
            state.isBlockPrevAppointment.set(true);
            state.isEditing.set(true);
        }
    };
};