import Title from "@/components/ui/Title.jsx";
import Subtitle from "@/components/ui/Subtitle.jsx";
import NewConsultContainer from "@/components/domain/waitingRoom/NewConsultContainer.jsx";

const NewConsultPage = () => {

    return (
        <>
            <Title text='Crear consulta'/>
            <Subtitle text='Nueva consulta para sala de espera'/>
            <NewConsultContainer/>
        </>
    )
}

export default NewConsultPage