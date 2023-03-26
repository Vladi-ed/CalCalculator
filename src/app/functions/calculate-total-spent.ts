import {ICalRecord} from "../interfaces/ICalRecord";

export function calculateTotalSpent(myArray: ICalRecord[]) {
  const totalCost = myArray
    .map(t => 100 * t.costNum)
    .reduce((acc, value) => acc + value, 0);

  // console.log('totalCost', totalCost);
  return totalCost/100;
}
