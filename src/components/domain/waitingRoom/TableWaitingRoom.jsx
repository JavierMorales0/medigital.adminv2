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
import {useRef, useMemo} from "react";
import P12Regular from "@/components/ui/P12Regular.jsx";
import {RadioButton} from "primereact/radiobutton";
import {Calendar} from "primereact/calendar";
import {CONSULT_STATUS} from "@/config/index.js";
import {Checkbox} from "primereact/checkbox";
import P14Regular from "@/components/ui/P14Regular.jsx";
import {Tooltip} from "primereact/tooltip";

const statusOptions = [
    {label: 'Todas', value: null},
    {label: 'En espera', value: 'WAITING'},
    {label: 'En consulta', value: 'IN PROGRESS'},
    {label: 'Finalizada', value: 'FINISHED'},
    {label: 'Cancelada', value: 'CANCELED'},
]

const TableWaitingRoom = ({
                              data, sortOptionSelected, sortOptions, handleSort, filters,
                              handleFilter, handleGoToConsult, handleCancelConsult,
                              handleContinueConsult, handleEditConsult
                          }) => {
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
                        fontSize: '24px',
                        backgroundColor: 'var(--highlight-bg)',
                        borderRadius: '100%',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        height: '48px', width: '48px'
                    }}>{data?.length}</span>
                    <P14SemiBold sx={{margin: 0,}}>registros</P14SemiBold>
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
                    <section style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '450px'}}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            flexWrap: 'nowrap',
                            margin: '8px 0px'
                        }}>
                            <P12SemiBold sx={{margin: 0}}>Filtrar por</P12SemiBold>
                        </div>
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
                                                checked={filters['status'] === status.value}
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
                                    value={filters['date']}
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
                                width: '125px',
                                flexWrap: 'nowrap'
                            }}>
                                <P12Regular sx={{margin: 0}}>Solo cita previa:</P12Regular>
                                <Checkbox inputId="prevAppointment" checked={filters['prevAppointment']}
                                          onChange={(e) => {
                                              handleFilter('prevAppointment', e.checked)
                                          }}
                                ></Checkbox>
                            </div>
                        </div>

                    </section>
                </OverlayPanel>
            </div>
        </div>
    )

    const statusTag = (rowData) => {
        return (<>
                <Tooltip target={`#tag-${rowData?._id}`} content={rowData?._status} position="left" />
                <Tag id={`tag-${rowData?._id}`} severity={
                    rowData?._status === CONSULT_STATUS.WAITING ? 'info' :
                        rowData?._status === CONSULT_STATUS.IN_PROGRESS ? 'warning' :
                            rowData?._status === CONSULT_STATUS.FINISHED ? 'success' :
                                rowData?._status === CONSULT_STATUS.CANCELED ? 'danger' : 'info'
                }
                >{rowData?._status?.replaceAll(' ', '')?.trim()?.slice(0, 3)}</Tag>
                </>
            )
    }

    const emptyMessage = () => 
        <>
        <P12SemiBold sx={{margin: 8, textAlign: 'center'}}>No hay registros</P12SemiBold>
        <P12Regular sx={{margin: 0, textAlign: 'center'}}>Puede que no haya registros debido a los filtros aplicados</P12Regular>
        </>
    

    return (
        <DataTable value={data} tableStyle={style.table} header={header} size='small' emptyMessage={emptyMessage}
            paginator rows={10}
        >
            {/*<Column field="_id" header="ID"></Column>*/}
            <Column field="reason" header="Motivo/obs." body={(rowData) => {
                return (<div>
                    <P14SemiBold sx={{margin: 0}}>{rowData?.reason}</P14SemiBold>
                    <P12Regular sx={{margin: 0}}>{
                        (rowData?.observations?.length > 30)
                            ? rowData?.observations?.slice(0, 25) + '...'
                            : rowData?.observations || 'SIN ESPECIFICAR'}
                    </P12Regular>
                </div>)
            }}></Column>
            <Column field="patient" header="Paciente" body={(rowData) => {
                return (<div>
                    <P14Regular
                        sx={{margin: 0}}>{rowData?.patient?.first_name} {rowData?.patient?.last_name}</P14Regular>
                    <P12Regular sx={{margin: 0}}>{rowData?.patient?.dui}</P12Regular>
                </div>)
            }}></Column>
            <Column field="doctor.employee" header="Médico" body={(rowData) => {
                return (<div>
                    <P14Regular
                        sx={{margin: 0}}>{rowData?.doctor?.employee?.first_name} {rowData?.doctor?.employee?.last_name}</P14Regular>
                    <P12Regular sx={{margin: 0}}>{rowData?.doctor?.specialties?.map(
                        (specialty, index) => {
                            return (index === 0) ? specialty : ', ' + specialty
                        }
                    )}</P12Regular>
                </div>)
            }}></Column>
            <Column field="date" header="Fecha" body={(rowData) => {
                return (<P14SemiBold>{format(parseISO(rowData?.date?.slice(0, 10)), 'PP')}</P14SemiBold>)
            }}></Column>
            <Column field="_status" header="Estado" body={statusTag}></Column>
            <Column header="Acciones" body={(rowData) => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: '16px',
                        width: '100%',
                        minWidth: '200px',
                        margin: '0 auto'
                    }}>
                        {
                            rowData?._status === CONSULT_STATUS.WAITING && (
                                <>
                                    <Button icon="pi pi-align-center" text rounded raised aria-label="Tomar signos vitales"
                                            severity="secondary" size="small" tooltip="Tomar signos vitales"
                                            tooltipOptions={{position: 'left'}}/>
                                    <Button icon="pi pi-angle-right" text raised rounded aria-label="Pasar a consultorio" severity="primary"
                                            size="small" tooltip="Pasar a consultorio" tooltipOptions={{position: 'left'}}
                                            onClick={() => handleGoToConsult(rowData?._id)}
                                    />
                                    <Button icon="pi pi-pencil" text raised aria-label="Editar" rounded severity="warning" size="small"
                                            tooltip="Editar" tooltipOptions={{position: 'left'}} onClick={() => handleEditConsult(rowData)} />
                                    <Button icon="pi pi-times" text raised aria-label="Cancelar" rounded severity="danger" size="small"
                                            tooltip="Cancelar" tooltipOptions={{position: 'left'}}
                                            onClick={() => handleCancelConsult(rowData?._id)}
                                    />
                                </>
                            )
                        }

                        {
                            rowData?._status === CONSULT_STATUS.CANCELED && (
                                <Button icon="pi pi-check" text raised aria-label="Restablecer" rounded severity="primary" size="small"
                                        tooltip="Restablecer" tooltipOptions={{position: 'left'}}
                                        onClick={() => handleContinueConsult(rowData?._id)}
                                />
                            )
                        }
                    </div>
                )
            }}></Column>
        </DataTable>
    )
}

const style = {
    table: {}
}
export default TableWaitingRoom