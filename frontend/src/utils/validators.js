export const isValidDate = (dateString) => {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
}

export const isFutureDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
}

export const isValidAirportCode = (code) => {
    return /^[A-Z]{3}$/i.test(code)
}