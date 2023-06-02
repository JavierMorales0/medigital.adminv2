const P16Regular = ({sx={}, color = '--text-color', children}) => (<p style={{
    fontSize: '16px', lineHeight: '24px', fontWeight: 400, color: `var(${color})`, ...sx
}}>{children}</p>)

export default P16Regular