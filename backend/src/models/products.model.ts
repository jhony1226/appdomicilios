import { Category } from './category.model';

export interface ProductOutput {
  id: number;
  name: string;
  category: Category;
  purchase_buy: number;
  sale_price: number;
  inventory: number;
}

export interface ProductInput {
  id: number;
  name: string;
  category: Category;
  purchase_buy: number;
  sale_price: number;
  inventory: number;
}
