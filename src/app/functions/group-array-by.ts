/**
 * Groups an array by a given predicate (used in graph).
 * @param array The array to group.
 * @param predicate A function that takes an element of the array and returns a string that will be used as the key for the element in the output object.
 * @returns An object that maps the keys returned by the predicate to arrays of the elements in the input array that have the same key.
 */
export const groupArrayBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
    array.reduce((acc, value, index, array) => {
        (acc[predicate(value, index, array)] ||= []).push(value);
        return acc;
    }, {} as { [key: string]: T[] });
