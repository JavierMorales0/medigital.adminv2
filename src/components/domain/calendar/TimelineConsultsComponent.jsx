import {Timeline} from "primereact/timeline";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {format, parseISO} from "date-fns";
import P16SemiBold from "@/components/ui/P16SemiBold.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";
import P10Regular from "@/components/ui/P10Regular.jsx";

const TimelineConsultsComponent = ({consults}) => {

    const customContent = (item) => {
        return (<Card title={format(parseISO(item?.date), 'PP')}
                      subTitle={`${item?.start_hour || 'Desconocido'} - ${item?.end_hour || 'Desconocido'}`}
                      style={{position: 'relative'}}
        >
            <div style={style.content}>
                <P16SemiBold sx={{...style.text, marginBottom: '8px'}}>{item?.reason?.toUpperCase()}
                </P16SemiBold>
                <div style={{margin: '0 16px'}}>
                    {item?.observations !== '' && <P12Regular sx={style.text}>{item?.observations}</P12Regular>}
                    {item?.physical_findings !== '' &&
                        <P12Regular sx={style.text}>{item?.physical_findings}</P12Regular>}
                    {item?.medical_record !== '' && <P12Regular sx={style.text}>{item?.medical_record}</P12Regular>}
                </div>
                <div style={{marginTop: '16px'}}>
                    <P10Regular sx={style.text} color='--gray-500'>Atendido por:</P10Regular>
                    <P12Regular
                        sx={style.text}>{`${item?.doctor?.employee?.first_name} ${item?.doctor?.employee?.last_name}`}</P12Regular>
                    {
                        item?.doctor?.specialties?.length > 0 && (
                            <P12Regular sx={style.text} color='--gray-500'>Especialidades: {
                                item?.doctor?.specialties?.map((specialty, index) => {
                                    return `${specialty}${index === item?.doctor?.specialties?.length - 1 ? '' : ', '}`
                                })
                            }</P12Regular>
                        )
                    }
                </div>
            </div>
            <Button label="Ir a expediente" size='small' type='button' severity='secondary' text style={style.btn}/>
        </Card>)
    }
    return (<Timeline
        value={consults}
        align="alternate"
        content={customContent}
    />)
}

const style = {
    content: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'column',
    }, text: {margin: 0},
    btn: {
        width: '100%',
    }
}

export default TimelineConsultsComponent;