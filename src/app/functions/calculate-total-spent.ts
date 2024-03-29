import {IRecord} from "../interfaces/IRecord";

/**
 * Calculate total spent for summary row
 * @param myArray array of Cal records
 * @returns totalCost of provided records
 */
export function calculateTotalSpent(myArray: IRecord[]) {
  const totalCost = myArray
    .map(t => 100 * t.costNum)
    .reduce((acc, value) => acc + value, 0);

  // console.log('totalCost', totalCost);
  return totalCost/100;
}
