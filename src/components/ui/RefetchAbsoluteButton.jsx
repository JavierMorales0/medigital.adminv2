import { Button } from 'primereact/button';

const RefetchAbsoluteButton = ({ refetch, top = null, left = null, bottom= null, right= null, size=64 }) => {
    const style= {
        position: 'absolute',
        top: top ?? 'unset',
        left: left ?? 'unset',
        bottom: bottom ?? 'unset',
        right: right ?? 'unset',
        height: `${size}px`,
        width: `${size}px`,
    }
    return (
        <Button icon="pi pi-sync"
                rounded
                text
                raised
                severity="help"
                aria-label="Refetch"
                onClick={refetch}
                style={style}
        />
    )
}



export default RefetchAbsoluteButton;