import {Category} from './category';

export class ProductDto {
  id: number;
  name: string;
  description: string;
  price: string;
  note: string;
  category: Category;
}
