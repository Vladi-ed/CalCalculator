export interface IPayment {
  keyword: string;
  translation: string;
  category?: Categories;
  logo?: string;
}

type Categories = 'food' | 'household' | 'finance services' | 'transport' | 'health' | 'restaurants' | 'entertainment' | 'coffee' | 'pet' | 'child';
