import {Skeleton} from "primereact/skeleton";

const AuthPageSkeleton = () => {
    return (
        <div style={style.container}>
            <div style={style.subcontainer}>
                <Skeleton className="mb-2" width='80px'></Skeleton>
                <div style={style.subcontainerCol}>
                    <Skeleton width='140px'></Skeleton>
                    <Skeleton height='30px' width='200px'></Skeleton>
                </div>
                <Skeleton height='50px' width='350px'></Skeleton>
                <Skeleton height='50px' width='350px'></Skeleton>
                <div style={style.subcontainerRow}>
                    <Skeleton height='12px' width='100px'></Skeleton>
                    <Skeleton height='12px' width='150px'></Skeleton>
                </div>
                <Skeleton height='50px' width='350px'></Skeleton>
                <Skeleton height='12px' width='350px'></Skeleton>
            </div>
            <div></div>
        </div>
    )
}

const style = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    subcontainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '350px'
    }, subcontainerCol: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    }, subcontainerRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
        justifyContent: 'space-between',
    }
}

export default AuthPageSkeleton
