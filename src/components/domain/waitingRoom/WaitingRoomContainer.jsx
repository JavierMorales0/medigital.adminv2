import EditWaitingRoom from "@/components/domain/waitingRoom/EditWaitingRoom.jsx";
import ListWaitingRoom from "@/components/domain/waitingRoom/ListWaitingRoom.jsx";

const WaitingRoomContainer = ({isOneItemSelected}) => {
    if (!isOneItemSelected) {
        return (<ListWaitingRoom/>)
    }
    if (isOneItemSelected) {
        return (<EditWaitingRoom/>)
    }
}

export default WaitingRoomContainer;