const P14Regular = ({sx={}, color = '--text-color', children}) => (<p style={{
    fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: `var(${color})`, ...sx
}}>{children}</p>)

export default P14Regular