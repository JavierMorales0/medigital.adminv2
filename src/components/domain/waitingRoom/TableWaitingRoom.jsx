import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import {DataTable} from "primereact/datatable";
import P14SemiBold from "@/components/ui/P14SemiBold.jsx";
import P12SemiBold from "@/components/ui/P12SemiBold.jsx";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {Tag} from "primereact/tag";
import {format, parseISO} from "date-fns";
import {OverlayPanel} from "primereact/overlaypanel";
import {useRef} from "react";
import P12Regular from "@/components/ui/P12Regular.jsx";
import {RadioButton} from "primereact/radiobutton";
import {Calendar} from "primereact/calendar";
import {ToggleButton} from 'primereact/togglebutton';
import {CONSULT_STATUS} from "@/config/index.js";

const statusOptions = [
    {label: 'En espera', value: 'WAITING'},
    {label: 'En consulta', value: 'IN PROGRESS'},
    {label: 'Finalizada', value: 'FINISHED'},
    {label: 'Cancelada', value: 'CANCELED'},
]

const TableWaitingRoom = ({data, sortOptionSelected, sortOptions, handleSort, handleFilter}) => {
    const overlayPanel = useRef(null);

    const header = (
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '500px',
                gap: '8px',
                justifyContent: 'space-evenly'
            }}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px',}}>
                    <span style={{
                        color: "var(--primary-color)",
                        fontSize: '28px',
                        backgroundColor: 'var(--highlight-bg)',
                        borderRadius: '100%',
                        padding: '8px'
                    }}>{data?.length}</span>
                    <P14SemiBold sx={{margin: 0}}>registros</P14SemiBold>
                </div>
                <Divider layout="vertical"/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', width: '60%'}}>
                    <P12SemiBold sx={{margin: 0}}>Ordenar por:</P12SemiBold>
                    <Dropdown value={sortOptionSelected} options={sortOptions} optionLabel='label' optionValue='value'
                              onChange={handleSort} placeholder="Seleccionar" style={{flexGrow: 1}}
                    />
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px'}}>
                <Button icon="pi pi-print" text raised aria-label="Imprimir" severity="secondary" size="small"/>
                <Button icon="pi pi-filter" label="Filtrar" text raised aria-label="Filtrar" severity="secondary"
                        size="small"
                        onClick={(e) => overlayPanel.current.toggle(e)}/>
                <OverlayPanel ref={overlayPanel}>
                    <form style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '450px'}}
                          onSubmit={handleFilter}>
                        <P12SemiBold sx={{margin: 0}}>Filtrar por</P12SemiBold>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '8px',
                            width: '100%',
                            flexWrap: 'nowrap',
                            margin: '8px 0px'
                        }}>
                            <P12Regular sx={{margin: 0}}>Estado:</P12Regular>
                            {
                                statusOptions?.map((status, index) => {
                                    return (
                                        <div key={index} style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <RadioButton
                                                value={status.value}
                                                // checked={formik.values.item === btn.value}
                                                onChange={(e) => {
                                                    handleFilter('status', e.value)
                                                }}
                                            />
                                            <label htmlFor={status.value} style={{fontSize: '12px'}}>
                                                {status.label}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            flexWrap: 'nowrap',
                            margin: '8px 0px'
                        }}>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '8px',
                                flexGrow: 1,
                                flexWrap: 'nowrap'
                            }}>
                                <P12Regular sx={{margin: 0}}>Fecha:</P12Regular>
                                <Calendar
                                    dateFormat="dd 'de' MM, yy"
                                    style={{flexGrow: 1}}
                                    showButtonBar
                                    onChange={(e) => {
                                        handleFilter('date', e.value)
                                    }}
                                />
                            </div>
                            <Divider layout="vertical"/>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '8px',
                                width: '175px',
                                flexWrap: 'nowrap'
                            }}>
                                <P12Regular sx={{margin: 0}}>Con cita previa:</P12Regular>
                                <ToggleButton size="small" onLabel="Si" offLabel="No" checked={false}
                                              onChange={(e) => {
                                                  handleFilter('prevAppointment', e.value)
                                              }}/>
                            </div>
                        </div>

                    </form>
                </OverlayPanel>
            </div>
        </div>
    )

    const statusTag = (rowData) => {
        return (<Tag severity={
            rowData?._status === CONSULT_STATUS.WAITING ? 'info' :
                rowData?._status === CONSULT_STATUS.IN_PROGRESS ? 'warning' :
                    rowData?._status === CONSULT_STATUS.FINISHED ? 'success' :
                        rowData?._status === CONSULT_STATUS.CANCELED ? 'danger' : 'info'
        }
        >{rowData?._status?.replaceAll(' ', '')?.trim()?.slice(0,3)}</Tag>)
    }

    return (
        <DataTable value={data} tableStyle={style.table} header={header}>
            {/*<Column field="_id" header="ID"></Column>*/}
            <Column field="reason" header="Motivo"></Column>
            <Column field="observations" header="Observaciones" body={(rowData) => { return (<span>{rowData?.observations?.slice(0, 20)}...</span>)}}></Column>
            <Column field="patient" header="Paciente" body={(rowData) => { return (<span>{rowData?.patient?.first_name} {rowData?.patient?.last_name}</span>)}}></Column>
            <Column field="doctor.employee" header="Médico" body={(rowData) => { return (<span>{rowData?.doctor?.employee?.first_name} {rowData?.doctor?.employee?.last_name}</span>)}}></Column>
            <Column field="date" header="Fecha" body={(rowData) => {
                return (<span>{format(parseISO(rowData?.date), 'PP')}</span>)
            }}></Column>
            <Column field="_status" header="Estado" body={statusTag}></Column>
        </DataTable>
    )
}

const style = {
    table: {}
}
export default TableWaitingRoom