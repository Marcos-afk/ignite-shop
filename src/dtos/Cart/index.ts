import { ProductDTO } from '@dtos/product';

export interface CartDTO {
  product: ProductDTO;
  quantity: number;
}
