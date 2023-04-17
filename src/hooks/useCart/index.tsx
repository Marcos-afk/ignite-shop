import { useContext } from 'react';

import { CartContext } from '@contexts/Cart';

export const useCart = () => {
  return useContext(CartContext);
};
