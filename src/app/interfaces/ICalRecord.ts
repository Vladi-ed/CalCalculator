export interface ICalRecord {
  date: string;
  description: string;
  cost: string;
  costNis: string;
  costNum: number;
  comment?: string;
  transactionType?: string;
  category?: string;
  translation?: string;
  myCategory?: string;
  count: number;
}
