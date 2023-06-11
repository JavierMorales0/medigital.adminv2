const Subtitle = ({text})=>{
    return (
        <p style={style}>
            {text}
        </p>
    )
}

const style ={
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '32px',
    margin: 0
}

export default Subtitle