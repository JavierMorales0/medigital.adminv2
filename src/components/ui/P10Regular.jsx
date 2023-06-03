const P10Regular = ({sx = {}, color = '--text-color', children}) => (<p style={{
    fontSize: '10px', lineHeight: '14px', fontWeight: 400, color: `var(${color})`, ...sx
}}>{children}</p>)

export default P10Regular