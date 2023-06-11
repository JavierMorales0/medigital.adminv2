const Title = ({text})=>{
    return (
        <p style={style}>
            {text}
        </p>
    )
}

const style ={
    fontSize: '32px',
    fontWeight: '500',
    lineHeight: '40px',
    textTransform: 'uppercase',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    margin: 0
}

export default Title