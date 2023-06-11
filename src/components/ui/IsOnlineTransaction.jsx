const isOnlineTransaction = ({ isOnline}) => {
    if (!isOnline) return (<> </>)
    return (
        <span style={style}>
            <i className="pi pi-at" style={{fontSize: '10px', marginRight: '4px'}}/> En línea
        </span>
    )
}

const style = {
    // position: 'absolute',
    // top: '4px',
    // right: '4px',
    width: 'fit-content',
    height: '20px',
    backgroundColor: 'var(--green-100)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    fontSize: '8px',
    padding: '0 4px',
}

export default isOnlineTransaction