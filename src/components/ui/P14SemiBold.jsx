const P14SemiBold = ({sx={}, className = "", color = '--text-color', children}) => (<p style={{
    fontSize: '14px', lineHeight: '20px', fontWeight: 500, color: `var(${color})`, ...sx
}} className={className}>{children}</p>)

export default P14SemiBold