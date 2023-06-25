import {Dialog} from "primereact/dialog";
import P14SemiBold from "@/components/ui/P14SemiBold.jsx";
import P16SemiBold from "@/components/ui/P16SemiBold.jsx";
import {Button} from "primereact/button";
import PlatformChipComponent from "@/components/domain/calendar/PlatformChipComponent.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";
import PatientsService from "@/services/PatientsService.js";
import AppointmentAllInfoDetailsComponent from "@/components/domain/calendar/AppointmentAllInfoDetailsComponent.jsx";
import NoDetailsComponent from "@/components/domain/calendar/NoDetailsComponent.jsx";
import {useMemo} from "react";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";

const DialogAppointmentComponent = ({visible, handleHide, appointment}) => {
    const {dataAllInfoSpecificPatient: data, isLoadingAllInfoSpecificPatient: isLoading} = PatientsService()
    const temporalConsultState = useTemporalConsultState();
    const header = () => {
        return (<P14SemiBold>Detalles de cita</P14SemiBold>)
    }
    const patientExists = useMemo(() => {
        return data?.patient?._id
    }, [data])

    const handleClickHasArrived = () => {
        temporalConsultState?.init()
        const consult = {
            _id: appointment?.resource?._id,
            patient: data?.patient?._id,
            reason: appointment?.resource?.reason,
            observations: appointment?.resource?.observations,
        }
        temporalConsultState.fillDataWithPrevAppointment(consult);
        handleHide()
    }
    return (
        <Dialog visible={visible} onHide={handleHide} style={style.dialog} position='bottom-right' header={header}
                draggable={false} resizable={false}>
            {
                appointment && (
                    <>
                        <div style={style.header}>
                            <div style={style.headerData}>
                                <img
                                    style={style.avatar}
                                    src={appointment?.resource?.booked_by?.avatar}
                                    alt="picture of the user"
                                    referrerPolicy='no-referrer'/>

                                <div style={{display: 'flex', flexDirection: 'column', gap: '0px'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '4 px'}}>
                                        <P16SemiBold sx={style.text}>
                                            {appointment?.resource?.name}
                                        </P16SemiBold>
                                        <PlatformChipComponent platform={appointment?.resource?.booked_by?.platform}/>
                                    </div>
                                    <P12Regular sx={style.text} color='--gray-500'>
                                        {appointment?.resource?.booked_by?.email}
                                    </P12Regular>
                                </div>

                            </div>
                            <div style={style.headerActions}>
                                {
                                    appointment?.resource?.status === 'PENDING' && (
                                        <>
                                            <Button label="Ha llegado" size='small' type='button' severity='success' text
                                                    icon="pi pi-check-circle" iconPos="left" disabled={!patientExists}
                                                    onClick={handleClickHasArrived}
                                            />
                                            <Button label="Reprogramar" size='small' type='button' severity='secondary' text
                                                    icon="pi pi-calendar-plus" iconPos="left"
                                            />
                                        </>
                                    )
                                }


                            </div>
                        </div>
                        <div style={style.content}>
                            {
                                !isLoading && (data
                                    ? <AppointmentAllInfoDetailsComponent data={data}/>
                                    : <NoDetailsComponent appointment={appointment?.resource}/>)
                            }
                        </div>
                    </>
                )
            }
        </Dialog>
    )
}

const style = {
    dialog: {
        width: '800px',
        height: '100vh',
    },
    text: {
        margin: 0,
    },
    header: {
        width: '100%',
        height: '100px',
        padding: '16px',
        backgroundColor: 'var(--surface-ground)',
        display: 'flex',
        gap: '16px',
        justifyContent: 'space-around',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
    },
    headerData: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
    }, headerActions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: '8px'
    }, content: {
        width: '100%',
        padding: '8px 24px',
        height: 'calc(100% - 100px)',
        overflowY: 'auto',
    }
}

export default DialogAppointmentComponent;