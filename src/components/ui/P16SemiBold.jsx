const P16SemiBold = ({color = '--text-color', children}) => (<p style={{
    fontSize: '16px', lineHeight: '24px', fontWeight: 500, color: `var(${color})`
}}>{children}</p>)

export default P16SemiBold