const P12SemiBold = ({sx = {}, color = '--text-color', children}) => (<p style={{
    fontSize: '12px', lineHeight: '16px', fontWeight: 500, color: `var(${color})`, ...sx
}}>{children}</p>)

export default P12SemiBold