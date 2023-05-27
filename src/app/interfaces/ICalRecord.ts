export interface ICalRecord {
  date: string;
  description: string;
  currency: string;
  cost: string;
  costNis: string;
  costNum: number;
  comment?: string;
  transactionType?: string;
  categoryHeb?: string;
  translation?: string;
  myCategory?: string;
  count: number;
}
