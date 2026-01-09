// filepath: c:\Users\SMIT CHAUDHARI\OneDrive\Desktop\Git Uploads\2526_sdp8_tripagent\frontend\src\components\common\Input.jsx
function Input({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    className = '',
    ...props
}) {
    return (
        <div className={`space-y-1 ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}

export default Input