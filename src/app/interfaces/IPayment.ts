export interface IPayment {
  keyword: string;
  translation: string;
  category?: 'food' | 'household' | 'bank' | 'transport' | 'health' | 'restaurants' | 'entertainment' | 'coffee' | 'pet' | 'child';
  logo?: string;
}
