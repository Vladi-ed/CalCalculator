/**
 * Validates Taudat Zehut
 * @param tz
 * @returns true/false when valid or not
 */
export const validateTz = (tz: string | number): boolean => {
    const tzStr = String(tz);

    if (tzStr.length > 9 || tzStr.length < 5 || Number.isNaN(Number(tz))) {
        return false;
    }

    const paddedTzStr = tzStr.padStart(9, '0');
    let counter = 0;

    for (let i = 0; i < 9; i++) {
        let incNum = Number(paddedTzStr.charAt(i));
        incNum *= (i % 2) + 1;
        if (incNum > 9) {
            incNum -= 9;
        }
        counter += incNum;
    }

    return counter % 10 === 0;
};