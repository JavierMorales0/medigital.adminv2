const P14Light = ({sx={}, color = '--text-color', children}) => (<p style={{
    fontSize: '14px', lineHeight: '20px', fontWeight: 300, color: `var(${color})`, ...sx
}}>{children}</p>)

export default P14Light