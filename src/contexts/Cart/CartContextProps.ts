/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */

import { CartDTO } from '@dtos/Cart';
import { ProductDTO } from '@dtos/product';

export interface CartContextProps {
  cart: CartDTO[];
  addNewItemToCart: (product: ProductDTO, quantity: number) => void;
  removeItemToCart: (productId: number) => void;
  updateItemToCart: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export interface CartProviderProps {
  children: React.ReactNode;
}
