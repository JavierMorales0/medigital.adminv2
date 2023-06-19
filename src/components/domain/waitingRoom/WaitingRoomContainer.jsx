import ConsultsService from "@/services/ConsultsService.js";
import TableWaitingRoom from "@/components/domain/waitingRoom/TableWaitingRoom.jsx";
import {useHookstate} from "@hookstate/core";
import {useMemo} from "react";

const sortOptions = [
    {label: '_id', value: '_id'},
    {label: 'fecha', value: 'date'},
    {label: 'paciente', value: 'patient.first_name'},
    {label: 'médico', value: 'doctor.employee.first_name'},
    {label: 'estado', value: 'status'},
]
const WaitingRoomContainer = () => {

    const {dataConsults: data} = ConsultsService();
    const sortOptionSelected = useHookstate(null)
    const filterOptionSelected = useHookstate(null)
    const processedData = useMemo(() => {
        if (!data) return []
        let _data = [...data]
        const filter = filterOptionSelected?.get()
        if (filter) {
            _data = _data?.filter((item) => {
                if (filterOptionSelected?.value === 'status') {
                    return item?.status === filter
                }
            })
        }
        return _data?.sort((a, b) => {
            if (sortOptionSelected?.value === '_id') {
                return a?._id - b?._id
            }
            if (sortOptionSelected?.value === 'date') {
                return a?.date - b?.date
            }
            if (sortOptionSelected?.value === 'patient.first_name') {
                return a?.patient?.first_name.localeCompare(b?.patient?.first_name)
            }
            if (sortOptionSelected?.value === 'doctor.employee.first_name') {
                return a?.doctor?.employee?.first_name.localeCompare(b?.doctor?.employee?.first_name)
            }
            if (sortOptionSelected?.value === 'status') {
                return a?.status?.localeCompare(b?.status)
            }
        })
    }, [data, sortOptionSelected])

    const handleSort = (e) => {
        sortOptionSelected.set(e.value)
    }

    const handleFilter = (key, value) => {
        console.log(key, value)

    }

    return (
        <section style={style.container}>
            {/*<div>*/}
            {/*    adad*/}
            {/*</div>*/}
            <div style={style.table}>
                {
                    data?.length !== 0 && (
                        <TableWaitingRoom data={processedData}
                                          sortOptionSelected={sortOptionSelected?.get()}
                                          sortOptions={sortOptions}
                                          handleSort={handleSort}
                                          handleFilter={handleFilter}
                        />
                    )
                }

            </div>
        </section>)
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, table: {
        width: '100%',
    }
}

export default WaitingRoomContainer