import Page from "@/pages/Page.jsx";
import GeneralInformationComponent from "@/components/domain/consultingRoom/GeneralInformationComponent.jsx";
import {useConsultInProgressState} from "@/hooks/ConsultInProgressState.js";
import {getConsultInProgress} from "@/utils/LocalStorageUtils.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useUIState} from "@/hooks/UIState.js";
import ActionsComponent from "@/components/domain/consultingRoom/ActionsComponent.jsx";
import ConsultsService from "@/services/ConsultsService.js";

const ConsultingRoomPage = () => {
    const consultInProgressState = useConsultInProgressState();
    const {cancelSpecific} = ConsultsService();
    const navigate = useNavigate();
    const ui = useUIState();

    useEffect(() => {
        //* Si no hay consultInProgressState, lo llenamos con el consultInProgress del localStorage
        const consultInProgress = getConsultInProgress();
        if (consultInProgressState?.isEmpty() && consultInProgress) {
            consultInProgressState.fill(consultInProgress);
        }
        if (consultInProgressState?.isEmpty() && !consultInProgress) {
            ui?.addNotification('No hay consultas en progreso.');
            navigate('/sala-de-espera');
        }
    }, [])

    const handleFinishConsult = () => {

    }

    const handleCancelConsult = () => {
        cancelSpecific.mutate(consultInProgressState?._id)
    }

    return (
        <Page title='Consultorio'>
            <div style={style.container}>
                <GeneralInformationComponent _id={consultInProgressState?._id} date={consultInProgressState?.date}
                                             startHour={consultInProgressState?.startHour}/>
                <ActionsComponent handleFinishConsult={handleFinishConsult} handleCancelConsult={handleCancelConsult}/>
            </div>
        </Page>
    )
}

const style = {
    container: {
        display: 'grid',
        gridTemplateColumns: '450px 1fr',
        gap: '16px',
    }
}
export default ConsultingRoomPage;