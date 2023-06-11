import Page from "@/pages/Page.jsx";
import {Outlet} from "react-router-dom";

const WaitingRoomPage = () => {
    return (
        <Page title='Sala de espera'>
            <Outlet/>
        </Page>
    )
}

export default WaitingRoomPage