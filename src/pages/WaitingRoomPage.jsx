import Page from "@/pages/Page.jsx";
import NewConsultContainer from "@/components/domain/waitingRoom/NewConsultContainer.jsx";
import ConsultsService from "@/services/ConsultsService.js";
import {useEffect} from "react";

const WaitingRoomPage = () => {
    const {dataConsultsToday: data} = ConsultsService();

    useEffect(()=>{
        console.log(data)
    },[])

    return (
        <Page title='Sala de espera'>
            <NewConsultContainer/>
            {data && data.map((consult, index) => (
                <div key={index}>
                    <p>{consult._id}</p>
                    <p>{consult.reason}</p>
                </div>
            ))}
        </Page>
    )
}

export default WaitingRoomPage