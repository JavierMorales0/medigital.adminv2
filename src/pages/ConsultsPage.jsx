import Page from "@/pages/Page.jsx";
import {useTemporalConsultState} from "@/hooks/TemporalConsultState.js";

const ConsultsPage = () => {
    const temporalConsult = useTemporalConsultState()
    console.log(temporalConsult?.isEmpty())
    return (
        <Page title='Consultas'>
            <h1>Consultas</h1>
        </Page>
    )
}

export default ConsultsPage;