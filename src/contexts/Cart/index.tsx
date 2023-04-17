import { createContext, useState } from 'react';

import { CartDTO } from '@dtos/Cart';
import { ProductDTO } from '@dtos/product';
import { produce } from 'immer';

import { CartContextProps, CartProviderProps } from './CartContextProps';

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartDTO[]>([]);

  const addNewItemToCart = (product: ProductDTO, quantity: number) => {
    const isExistItemInCart = cartItems.findIndex(
      (item) => item.product.id === product.id,
    );

    if (isExistItemInCart >= 0) {
      setCartItems((prevState) =>
        produce(prevState, (draft) => {
          draft[isExistItemInCart].quantity += quantity;
        }),
      );
    } else {
      setCartItems((prevState) => [
        ...prevState,
        {
          product,
          quantity,
        },
      ]);
    }
  };

  const removeItemToCart = (productId: number) => {
    setCartItems((prevState) =>
      prevState.filter((item) => item.product.id !== productId),
    );
  };

  const updateItemToCart = (productId: number, quantity: number) => {
    const isExistItemInCart = cartItems.findIndex(
      (item) => item.product.id === productId,
    );

    if (isExistItemInCart >= 0) {
      setCartItems((prevState) =>
        produce(prevState, (draft) => {
          draft[isExistItemInCart].quantity = quantity;
        }),
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        addNewItemToCart,
        removeItemToCart,
        updateItemToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
