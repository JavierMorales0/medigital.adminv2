import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";
import {useEffect, useMemo} from "react";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import P14SemiBold from "@/components/ui/P14SemiBold.jsx";
import {InputTextarea} from "primereact/inputtextarea";
import AutoCompleteInput from "@/components/ui/AutoCompleteInput.jsx";
import DoctorsService from "@/services/DoctorsService.js";
import {useHookstate} from "@hookstate/core";
import PatientsService from "@/services/PatientsService.js";
import P12SemiBold from "@/components/ui/P12SemiBold.jsx";
import {Button} from "primereact/button";
import P16Bold from "@/components/ui/P16Bold.jsx";
import P14Regular from "@/components/ui/P14Regular.jsx";
import ConsultsService from "@/services/ConsultsService.js";


const NewConsultContainer = () => {
    const temporalConsult = useTemporalConsultState()
    const { create } = ConsultsService()
    const {dataDoctors} = DoctorsService()
    const {dataPatients} = PatientsService()
    const suggestionsDoctor = useHookstate([])
    const suggestionsPatient = useHookstate([])
    useEffect(() => {
        return () => {
            //* Limpia la consulta temporal al salir de la página
            temporalConsult?.clear()
        }
    }, [])

    const handleCreate = (e) => {
        e.preventDefault()
        const validation = temporalConsult?.validateCreateObjectForServer()
        if(!validation.status){
            console.log('validation', validation)
            return
        }
        const data = temporalConsult?.createObjectForServer()
        create.mutate(data)
    }
    const handleClickExit = () => {
        temporalConsult?.clear()
    }

    const header = () => {
        return (<P14SemiBold>Nueva consulta</P14SemiBold>)
    }

    const handleCompleteDoctor = () => {
        const sug = dataDoctors.reduce((acc, item) => {
            //* Evaluar si hace match con el nombre o apellido
            const completeNameDoctor = `${item?.employee?.first_name} ${item?.employee?.last_name}`
            if (completeNameDoctor.toLowerCase().includes(temporalConsult?.doctor.toLowerCase())) {
                return [...acc, item]
            }
            return acc
        }, [])
        suggestionsDoctor.set(sug)
    }

    const handleCompletePatient = () => {
        const sug = dataPatients.reduce((acc, item) => {
            //* Evaluar si hace match con el nombre o apellido
            const completeNamePatient = `${item?.first_name} ${item?.last_name}`
            if (completeNamePatient.toLowerCase().includes(temporalConsult?.patient.toLowerCase())) {
                return [...acc, item]
            }
            return acc
        }, [])
        suggestionsPatient.set(sug)
    }
    const handleChangeDoctor = (e) => {
        console.log('change', e)
    }

    const handleSelectDoctor = ({value}) => {
        temporalConsult?.setDoctor(value?._id)
    }

    const handleSelectPatient = ({value}) => {
        temporalConsult?.setPatient(value?._id)
    }

    const doctorName = useMemo(() => {
        const doctor = dataDoctors?.find(item => item._id === temporalConsult?.doctor) || null
        return !doctor ? '' : `${doctor?.employee?.first_name} ${doctor?.employee?.last_name}`
    }, [temporalConsult?.doctor])

    const patientName = useMemo(() => {
        const patient = dataPatients?.find(item => item._id === temporalConsult?.patient) || null
        return !patient ? '' : `${patient?.first_name} ${patient?.last_name} | ${patient?.dui}`
    }, [temporalConsult?.patient])

    return (
        <Dialog visible={!temporalConsult?.isEmpty()} onHide={handleClickExit} position='bottom' draggable={false}
                resizable={false} style={style.dialog} header={header}>
            <form style={style.container} onSubmit={handleCreate}>
                {/*<ButtonCancelEditModeWaitingRoom handleClickExit={handleClickExit}/>*/}
                {/*<div style={style.header}>*/}
                {/*    <span style={style.header.title}>{format(parse(temporalConsult?.date, 'yyyy-MM-dd', new Date()), 'PP')}</span>*/}
                {/*    /!*<p style={style.header.subtitle}>Motivo: {temporalConsult?.reason || '-- NO DEFINIDO --'}</p>*!/*/}
                {/*</div>*/}
                {
                    temporalConsult?.isBlockPrevAppointment && (
                       <div style={style.prevAppointment}>
                           <P12SemiBold sx={{margin:0}}>La consulta se crear&aacute; con cita previa</P12SemiBold>
                           <P14Regular sx={{margin:0}}>{temporalConsult?.prevAppointment}</P14Regular>
                       </div> )
                }
                <div style={style.content}>
                    {
                        !temporalConsult?.isBlockPrevAppointment && (
                            <div style={style.content.row}>
                                <div className="form-group" style={{flex: 1}}>
                                    <span className="p-float-label">
                                        <InputText value={temporalConsult?.prevAppointment} style={style.input}
                                                   onChange={(e) => temporalConsult?.setPrevAppointment(e.target.value)}
                                        /><label htmlFor="patient">Cita previa</label>
                                    </span>
                                </div>
                            </div>
                        )
                    }

                    <div style={style.content.row}>
                        <div className="form-group" style={{flex: 1}}>
                            <span className="p-float-label">
                                <InputTextarea id="reason" value={temporalConsult?.reason} style={style.input} rows={2}
                                               autoResize maxLength={80} required
                                               onChange={(e) => temporalConsult?.setReason(e.target.value.toUpperCase())}/>
                                <label htmlFor="reason">Motivo *</label>
                            </span>
                        </div>
                        <div className="form-group" style={{flex: 1}}>
                            <span className="p-float-label">
                                <InputTextarea id="observations" value={temporalConsult?.observations}
                                               style={style.input} rows={2} autoResize maxLength={300}
                                               onChange={(e) => temporalConsult?.setObservations(e.target.value.toUpperCase())}/>
                                <label htmlFor="observations">Observaciones</label>
                            </span>
                        </div>

                    </div>
                    <div style={style.content.row}>
                        <div className="form-group" style={{flex: 1}}>
                            <span className="p-float-label">
                                <AutoCompleteInput
                                    completeMethod={handleCompletePatient}
                                    value={temporalConsult?.patient}
                                    suggestions={JSON.parse(JSON.stringify(suggestionsPatient.value))}
                                    field='first_name'
                                    required
                                    onChange={(e) => temporalConsult?.setPatient(e.target.value)}
                                    onSelect={handleSelectPatient}
                                    style={style.input}
                                /><label htmlFor="patient">Paciente *</label>
                            </span>
                            <P12SemiBold>{patientName}</P12SemiBold>
                        </div>
                        <div className="form-group" style={{flex: 1}}>
                            <span className="p-float-label">
                                <AutoCompleteInput
                                    completeMethod={handleCompleteDoctor}
                                    value={temporalConsult?.doctor}
                                    suggestions={JSON.parse(JSON.stringify(suggestionsDoctor.value))}
                                    field='employee.last_name'
                                    required
                                    onChange={(e) => temporalConsult?.setDoctor(e.target.value)}
                                    onSelect={handleSelectDoctor}
                                    style={style.input}
                                /><label htmlFor="patient">Doctor *</label>
                            </span>
                            <P12SemiBold>{doctorName}</P12SemiBold>
                        </div>
                    </div>
                    <Button label='Crear' style={{width: '50%', margin: '0 auto'}} type={"submit"}/>
                </div>
            </form>
        </Dialog>
    )
}
const style = {
    dialog: {
        width: '100%',
        maxWidth: '800px',
    },
    headerDialog: {display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around'},
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '32px',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right',
        gap: '12px',
        width: '100%',
        title: {
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '40px',
            margin: 0,
            backgroundColor: 'var(--highlight-bg)',

        },
        subtitle: {
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '24px',
            margin: 0
        }
    },prevAppointment:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--highlight-bg)',
        color: 'var(--highlight-text)',
        padding: '8px',
        width: '300px',
        borderRadius: '8px',
        margin: '0 auto',
        textAlign: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        paddingTop: '16px',
        row: {
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            width: '100%',
            maxWidth: '100%',
        }
    },
    input: {
        width: '100%',
    },
}
export default NewConsultContainer;