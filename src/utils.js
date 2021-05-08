const mouths = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Septembro', 'Outubro', 'Novembro', 'Dezembro']
const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const formatDate = (date, withTime = false) => {
    date = new Date(date)
    let dateString = `${date.getDate()} `
    dateString += `${mouths[date.getMonth()]} `
    dateString += date.getFullYear()
    if (withTime) {
        dateString += ` ás ${date.getHours()}:${date.getMinutes()} horas`
    }
    return dateString
}

const formatMoney = (money, currency = 'BRL', locale = 'pt-BR') => {
    const intl = new Intl.NumberFormat(locale, { style: 'currency', currency: currency })
    if (isNaN(money))
        money = 0
    return intl.format(money)
}

const range = (from, to, step = 1) => {
    let i = from
    const range = []

    while (i <= to) {
        range.push(i)
        i += step
    }

    return range
}

const fetchPageNumbers = (total, limit, currentPage, pageNeighbours) => {
    const totalPages = Math.ceil(total / limit)
    const totalBlocks = (pageNeighbours * 2) + 3

    if (totalPages > totalBlocks) {
        const startPage = Math.max(1, currentPage - pageNeighbours)
        const endPage = Math.min(totalPages, currentPage + pageNeighbours)
        let pages = this.range(startPage, endPage)
        const spillOffset = totalBlocks - (pages.length + 2)

        if (startPage < 2) {
            const extraPages = this.range(endPage + 1, endPage + spillOffset);
            pages = [...pages, ...extraPages]
        }
        if ((totalPages - currentPage) < 2) {
            const extraPages = this.range(startPage - spillOffset, startPage - 1);
            pages = [...extraPages, ...pages]
        }

        if (currentPage > 1)
            pages = [LEFT_PAGE, ...pages]
        if (currentPage < totalPages)
            pages = [...pages, RIGHT_PAGE]

        return pages
    }

    let pages = range(1, totalPages)

    if (currentPage > 1)
        pages = [LEFT_PAGE, ...pages]
    if (currentPage < totalPages)
        pages = [...pages, RIGHT_PAGE]

    return pages
}

export { formatDate, range, fetchPageNumbers, formatMoney }