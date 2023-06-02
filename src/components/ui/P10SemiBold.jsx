const P10SemiBold = ({sx = {}, color = '--text-color', children}) => (<p style={{
    fontSize: '10px', lineHeight: '14px', fontWeight: 500, color: `var(${color})`, ...sx
}}>{children}</p>)

export default P10SemiBold