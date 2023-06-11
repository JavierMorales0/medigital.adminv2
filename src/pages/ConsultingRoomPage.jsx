import Page from "@/pages/Page.jsx";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";

const ConsultingRoomPage = () => {
    const temporalConsult = useTemporalConsultState()
    console.log(temporalConsult?.isEmpty())
    return (
        <Page title='Consultorio'>
            <h1>Consultorio</h1>
        </Page>
    )
}

export default ConsultingRoomPage;