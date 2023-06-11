import {TabPanel, TabView} from "primereact/tabview";
import {useHookstate} from "@hookstate/core";
import GeneralInformationComponent from "@/components/domain/calendar/GeneralInformationComponent.jsx";
import TimelineConsultsComponent from "@/components/domain/calendar/TimelineConsultsComponent.jsx";

const AppointmentAllInfoDetailsComponent = ({data}) => {
    const activeIndex = useHookstate(0)

    const handleTabChange = (e) => {
        activeIndex.set(e.index)
    }
    return (
        <>
            <TabView activeIndex={activeIndex.value} onTabChange={handleTabChange} style={style.tabview}>
                <TabPanel header="Información general">
                    <GeneralInformationComponent data={data?.patient}/>
                </TabPanel>
                <TabPanel header="Historial">
                    <TimelineConsultsComponent consults={data?.consults}/>
                </TabPanel>
                <TabPanel header="Notas" disabled>
                </TabPanel>
                <TabPanel header="Documentos" disabled>
                </TabPanel>
            </TabView>
        </>)
}

const style = {
    tabview: {
        fontSize: '14px',
        fontWeight: '400 !important',
        height: '100%',
    }
}

export default AppointmentAllInfoDetailsComponent;