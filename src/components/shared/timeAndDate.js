export const getMonthString = (date) => {
    let dateString = String(date)
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = dateString.slice(5, 7);
    let newMonth;
    if (month.includes(0)) {
        if (month === "10") {
            newMonth = month;
            const monthString = months[newMonth - 1];
            return monthString
        }
        else {
            newMonth = month.slice(1, 2);
            const monthString = months[newMonth - 1];
            return monthString
        }
    } else {
        newMonth = month;
        const monthString = months[newMonth - 1];
        return monthString
    }
}

export const getDateInString = date => {
    const month = getMonthString(date)
    let dateString = String(date)
    const year = dateString.slice(0, 4);
    const day = dateString.slice(8, 10)
    return `${day} ${month} ${year}`

}

export const getYearInString = date => {
    let dateString = String(date)
    const year = dateString.slice(0, 4)
    return year;
}

export const getMovieDuration = duration => {
    let hours = Math.floor(duration / 60);
    var min = duration % 60;
    return `${hours}h ${min}min`
}

