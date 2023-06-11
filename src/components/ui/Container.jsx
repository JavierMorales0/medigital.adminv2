const Container = ({children}) => {
    return (
        <div style={style.container}>
            {children}
        </div>
    );
}

const style = {
    container: {
        width: '100%',
        padding: '16px',
    }
}
export default Container;