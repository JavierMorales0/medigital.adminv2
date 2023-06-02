import {ProgressSpinner} from "primereact/progressspinner";

const LoadingSpinner = () => {
    return (
        <div style={style.container}>
            <ProgressSpinner/>
        </div>
    )
}

const style = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9999,

    }
}

export default LoadingSpinner;