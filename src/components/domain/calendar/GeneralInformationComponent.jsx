import P16SemiBold from "@/components/ui/P16SemiBold.jsx";
import P12Regular from "@/components/ui/P12Regular.jsx";
import P12SemiBold from "@/components/ui/P12SemiBold.jsx";
import {Divider} from "primereact/divider";
import P10Regular from "@/components/ui/P10Regular.jsx";
import StatusChip from "@/components/ui/StatusChip.jsx";
import {PATIENT_STATUS} from "@/config/index.js";
import {Button} from "primereact/button";
import React from "react";
import {format, parse, parseISO} from "date-fns";

const GeneralInformationComponent = ({data}) => {
    const handleCopyClipboard = (value) => {
        navigator.clipboard.writeText(value)
    }
    return (
        <div style={style.container}>
            <div style={style.header}>
                <div>
                    <P10Regular sx={style.text}>
                        Nombre completo
                    </P10Regular>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px'}}>
                        <P16SemiBold sx={style.textValues}>
                            {data?.last_name}, {data?.first_name}
                        </P16SemiBold>
                        <StatusChip status={PATIENT_STATUS[data?.status]} bg='--green-100' color='--green-800'/>
                    </div>


                </div>
                <div style={{
                    backgroundColor: 'var(--highlight-bg)',
                    padding: '8px 16px',
                    borderRadius: '16px',
                    color: 'var(--highlight-text-color)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <P12SemiBold sx={style.textValues}> ID: {data?._id} </P12SemiBold>
                    <Button icon="pi pi-copy" rounded text size='small' type='button' aria-label='Copiar al portapapeles'
                        tooltip='Copiar al portapapeles' tooltipOptions={{position: 'top'}} onClick={()=> handleCopyClipboard(data?._id)}
                    />
                </div>
            </div>
            <Divider/>
            <div style={style.content}>
                <div style={{display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'space-between'}}>
                   <div>
                       <P10Regular sx={style.text}>
                           Dirección
                       </P10Regular>
                       <P16SemiBold sx={style.textValues}>
                           {data?.address}
                       </P16SemiBold>
                   </div>
                    <div>
                        <P10Regular sx={style.text}>
                            Departamento y municipio
                        </P10Regular>
                        <P16SemiBold sx={style.textValues}>
                            {data?.department?.name}, {data?.municipality?.name}
                        </P16SemiBold>
                    </div>
                    <div>
                        <P10Regular sx={style.text}>
                            Teléfono(s)
                        </P10Regular>
                        {
                            data?.phone_number?.map((phone, index) => {
                                return (<P16SemiBold sx={style.textValues}
                                                        key={index}>
                                    {phone}
                                </P16SemiBold>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'space-between'}}>
                    <div>
                        <P10Regular sx={style.text}>
                            Fecha de nacimiento
                        </P10Regular>
                        <P16SemiBold sx={style.textValues}>
                            {format(parseISO(data?.birthday), 'PPP')}
                        </P16SemiBold>
                    </div>
                    <div>
                        <P10Regular sx={style.text}>
                            Tipo de sangre
                        </P10Regular>
                        <P16SemiBold sx={style.textValues}>
                            {data?.blood_type}
                        </P16SemiBold>
                    </div>
                    <div>
                        <P10Regular sx={style.text}>
                           Género
                        </P10Regular>
                        <P16SemiBold sx={style.textValues}>
                            {data?.gender === 'M' ? 'Masculino' : 'Femenino'}
                        </P16SemiBold>
                    </div>
                    <div>
                        <P10Regular sx={style.text}>
                            DUI
                        </P10Regular>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px'}}>
                            <P16SemiBold sx={style.textValues}>
                                {data?.dui}
                            </P16SemiBold>
                            <Button icon="pi pi-copy" rounded text size='small' type='button' aria-label='Copiar al portapapeles'
                                    tooltip='Copiar al portapapeles' tooltipOptions={{position: 'top'}} onClick={()=> handleCopyClipboard(data?.dui)}
                            />
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'space-between'}}>
                    <div>
                        <P10Regular sx={style.text}>
                            Estado civil
                        </P10Regular>
                        <P16SemiBold sx={style.textValues}>
                            {data?.marital_status}
                        </P16SemiBold>
                    </div>
                    <div>
                        <P10Regular sx={style.text}>
                            Historial familiar
                        </P10Regular>
                        <P16SemiBold sx={style.textValues}>
                            {data?.family_history || 'No posee'}
                        </P16SemiBold>
                    </div>
                    <div>
                        <P10Regular sx={style.text}>
                            Historial personal
                        </P10Regular>
                        <P16SemiBold sx={style.textValues}>
                            {data?.personal_history || 'No posee'}
                        </P16SemiBold>
                    </div>
                </div>
            </div>
        </div>
    )
}
const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    }, header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }, text: {margin: 0, color: 'var(--surface-500)'},
    textValues: { margin: 0, marginLeft: '16px', marginTop: '4px'},
    content:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    }
}

export default GeneralInformationComponent;