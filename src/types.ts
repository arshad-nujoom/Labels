export type FontSize = 'normal' | 'small' | 'smallest';

export interface LabelData {
  productName: string;
  price: string;
  dueDate: string;
  ingredients: string;
  allergens: string;
  instructions: string;
  description: string;
  isVegan: boolean;
  fontSize: FontSize;
}