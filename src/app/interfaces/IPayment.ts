export interface IPayment {
  keyword: string;
  translation: string;
  category?: Categories;
  icon?: string;
}

type Categories = 'food' | 'household' | 'money transfer' | 'transport' | 'health' | 'restaurants' | 'entertainment' | 'coffee' | 'pet' | 'child' | 'care and beauty' | 'clothes' | 'other' | 'institutions';
