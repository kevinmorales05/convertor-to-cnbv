export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertDateToYYYYMMDD(dateString) {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses son indexados desde 0
    const day = ('0' + date.getDate()).slice(-2);
    
    return `${year}${month}${day}`;
}