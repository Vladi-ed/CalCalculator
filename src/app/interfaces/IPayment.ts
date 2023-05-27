export interface IPayment {
  keyword: string;
  translation: string;
  category?: Categories;
  icon?: string;
}

type Categories = 'food' | 'household' | 'finance services' | 'transport' | 'health' | 'restaurants' | 'entertainment' | 'coffee' | 'pet' | 'child';
