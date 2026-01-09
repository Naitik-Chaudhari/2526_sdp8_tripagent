export const formatPrice = (price, currency = 'USD') => {
    if (price == null) return '--'

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(price)
}