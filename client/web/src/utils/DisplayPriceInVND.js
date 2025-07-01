export const DisplayPriceInVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style : 'currency',
        currency : 'VND',
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2
    }).format(price)
}