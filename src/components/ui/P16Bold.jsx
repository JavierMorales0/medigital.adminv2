const P16Bold = ({color = '--text-color', children}) => (<p style={{
    fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: `var(${color})`
}}>{children}</p>)

export default P16Bold