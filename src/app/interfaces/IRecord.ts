export interface IRecord {
  date: string;
  description: string;
  currency: string;
  cost: string;
  costNis: string;
  costNum: number;
  comment?: string;
  transactionType?: string;
  categoryHeb?: string;
  address?: string;
  translation?: string;
  myCategory?: string;
  count: number;
}
