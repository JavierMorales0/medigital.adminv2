import Page from "@/pages/Page.jsx";
import NewConsultContainer from "@/components/domain/waitingRoom/NewConsultContainer.jsx";
import WaitingRoomContainer from "@/components/domain/waitingRoom/WaitingRoomContainer.jsx";

const WaitingRoomPage = () => {

    return (
        <Page title='Sala de espera'>
            <NewConsultContainer/>
            <WaitingRoomContainer/>
        </Page>
    )
}

export default WaitingRoomPage