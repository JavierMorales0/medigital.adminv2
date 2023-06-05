import Page from "@/pages/Page.jsx";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";
import WaitingRoomContainer from "@/components/domain/waitingRoom/WaitingRoomContainer.jsx";

const WaitingRoomPage = () => {
    const temporalConsult = useTemporalConsultState()
    return (
        <Page title='Sala de espera'>
            <WaitingRoomContainer isOneItemSelected={!temporalConsult?.isEmpty()}/>
        </Page>
    )
}

export default WaitingRoomPage