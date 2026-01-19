function Card({ children, className = '', hoverable = false, ...props }) {
    return (
        <div
            className={`bg-white rounded-xl shadow-md overflow-hidden ${hoverable ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''
                } ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

function CardHeader({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
            {children}
        </div>
    )
}

function CardBody({ children, className = '' }) {
    return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

function CardFooter({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card