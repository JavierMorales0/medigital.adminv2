import {Button} from "primereact/button";

const ButtonCancelEditModeWaitingRoom = ({handleClickExit}) =>{
    return (
        <Button icon="pi pi-sign-out" rounded text raised severity="danger" size='small' label='Cancelar'
                onClick={handleClickExit} aria-label="Cancelar" style={style.btn}
        />
    )
}

const style = {
    btn: {
        position: 'absolute',
        top: '16px',
        right: '16px',
    }
}

export default ButtonCancelEditModeWaitingRoom