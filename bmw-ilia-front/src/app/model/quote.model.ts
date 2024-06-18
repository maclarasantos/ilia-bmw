import { Person } from './person.model';
import { Product } from './product.model';

export interface Quote {
  product: Product;
  person: Person;
  id: number;
}
