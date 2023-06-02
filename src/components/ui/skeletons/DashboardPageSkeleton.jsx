import {Skeleton} from "primereact/skeleton";

const AuthPageSkeleton = () => {
    return (
        <div style={style.container}>
            <Skeleton className="mb-2" height='5rem' width='200px'></Skeleton>
            <Skeleton className="mb-2" height='5rem' width='600px'></Skeleton>
        </div>
    )
}

const style = {
    container: {
        flex: 1,
        width: '100%',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
}

export default AuthPageSkeleton
