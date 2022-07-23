import { format } from 'date-fns';
import vilocale from 'date-fns/locale/vi';

//export const weekdays = [...Array(7).keys()].map(i => vilocale.localize.day(i, { width: 'narrow'}));

const formatDate = (date) => {
    let parseDate = new Date(date)
    let formattedDate = format(parseDate, 'ccccc, dd/MM', {
        locale: vilocale
    })
    
    return formattedDate;
}
export default formatDate;

export const formatTimePicker = (date) => {
    let parseDate = new Date(date)
    let formattedDate = format(parseDate, 'kk:mm', {
        locale: vilocale
    })
    
    return formattedDate;
}

export const formatDateConfirm = (date) => {
    let parseDate = new Date(date)
    let formattedDate = format(parseDate, 'cccc, dd/MM/yyyy-kk:mm', {
        locale: vilocale
    })
    
    return formattedDate;
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

export const formatDateISO = (date, time) => {
    // console.log('DATE: ',typeof date.toString());
    // console.log('TIME: ', time.toString());
    let position = getPosition(date.toString(), ' ',4);
    let datePart = date.toString().substring(0, position);
    let timePart = time.toString().substring(position);
    let formatDate = new Date(datePart + timePart).toISOString();
    return formatDate
}