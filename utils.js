export function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    month = month < 10 ? '0' +month : month;
    let day = d.getDate();
    day = day < 10 ? '0' +day : day;
    return year + '-' + month + '-' + day;
}