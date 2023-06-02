const P12Light = ({sx = {}, color = '--text-color', children}) => (<p style={{
    fontSize: '12px', lineHeight: '16px', fontWeight: 300, color: `var(${color})`, ...sx
}}>{children}</p>)

export default P12Light