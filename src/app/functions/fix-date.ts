/**
 * Converts date to from Israel to US format for further date parsing
 * @param dateStr
 * @returns US formatted date string
 */
export const fixDate = (dateStr: string) => {
    const dateSplit = dateStr.split('/');
    return dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
}
