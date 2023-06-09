const P12Regular = ({sx = {}, color = '--text-color', children}) => (<p style={{
    fontSize: '12px', lineHeight: '16px', fontWeight: 400, color: `var(${color})`, ...sx
}}>{children}</p>)

export default P12Regular