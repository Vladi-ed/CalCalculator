/**
 * Converts date to from Israel to US format for further date parsing
 * @param dateStr
 * @param separator
 * @returns US formatted date string
 */
export const fixDate = (dateStr: string, separator = '/') => {
    const dateSplit = dateStr.split(separator);
    return dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
}
