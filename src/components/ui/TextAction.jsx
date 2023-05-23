const TextAction = ({text, action, type = 'p', fontSize = '16px', color = '--text-color', fontWeight = '400', style = {}}) => {
    switch (type) {
        case 'span':
            return (<span style={{fontSize, color: `var(${color})`, fontWeight, cursor: 'pointer', ...style}} onClick={action}>{text}</span>)
        case 'p':
        default:
            return (<p style={{fontSize, color: `var(${color})`, fontWeight,cursor: 'pointer', ...style}} onClick={action}>{text}</p>)
    }
}

export default TextAction