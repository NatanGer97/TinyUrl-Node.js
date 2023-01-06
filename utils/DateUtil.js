function getDateMonthAndYear() {
    let date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // console.log( month + "/" + year);
    return month + "/" + year;
}

module.exports = {getDateMonthAndYear}