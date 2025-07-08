export const DisplayPriceInVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style : 'currency',
        currency : 'VND',
        // minimumFractionDigits: 3,
        // maximumFractionDigits: 3
    }).format(price)
}