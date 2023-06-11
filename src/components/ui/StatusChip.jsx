const StatusChip = ({ status, bg = "--primary-color", color }) => {
    return (
        <span
            style={{backgroundColor:`var(${bg})`, color:`var(${color})`, padding: '4px 8px', borderRadius: '16px', fontSize: '10px', fontWeight: '600'}}
            className='p-unselectable-text'
        >
            {status}
        </span>
    )
}

export default StatusChip;