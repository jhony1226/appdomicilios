import { CategoryService } from './category.model';

export interface ServiceInput {
  id: number;
  name: string;
  duration: number;
  price: number;
  category: CategoryService;
}

export interface ServiceOutput {
  id: number;
  name: string;
  duration: number;
  price: number;
  category: CategoryService;
}
