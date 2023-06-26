import P16SemiBold from "@/components/ui/P16SemiBold.jsx";
import P14Regular from "@/components/ui/P14Regular.jsx";
import {format, parseISO} from 'date-fns';
import P14SemiBold from "@/components/ui/P14SemiBold.jsx";
import P16Regular from "@/components/ui/P16Regular.jsx";

const GeneralInformationComponent = ({_id, date, startHour}) => {
    return (
        <div style={style.container}>
            <P16SemiBold> Aspectos generales </P16SemiBold>
            {
                _id && (<P16Regular sx={style.text}> # {_id} </P16Regular>)
            }
            {
                date && (<P14Regular sx={style.text}> Fecha: {format(parseISO(date), 'PPP')} </P14Regular>)
            }
            {
                startHour && (<P14SemiBold sx={style.text}> {startHour} - ahora </P14SemiBold>)
            }
        </div>
    )
}

const style=  {
    container: {
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: 'var(--surface-0)'
    },
    text: { margin: 0 }
}

export default GeneralInformationComponent;