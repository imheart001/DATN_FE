export const formatDate = (date: string) => {
    const dateStr = new Date(date)

    const day = dateStr.getDay()
    const month = dateStr.getMonth() + 1

    return `${day} - ${month}`
}