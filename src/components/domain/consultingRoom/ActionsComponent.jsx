import {Button} from 'primereact/button';

const ActionsComponent = ({handleFinishConsult, handleCancelConsult}) => {
    return (
        <div>
            <Button
                label={'Finalizar consulta'}
                aria-label={'Finalizar consulta'}
                rounded
                icon={'pi pi-check'}
                severity='success'
                size='small'
                onClick={handleFinishConsult}
            />
            <Button
                label={'Cancelar consulta'}
                aria-label={'Cancelar consulta'}
                rounded
                icon={'pi pi-times'}
                severity='secondary'
                size='small'
                outlined
                onClick={handleCancelConsult}
            />
        </div>
    )
}

export default ActionsComponent;