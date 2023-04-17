import { useState } from 'react';

import { useCart } from '@hooks/useCart';
import { X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as S from '@styles/components/modal';
import { formatPrice } from '@utils/formatPrice';
import axios from 'axios';
import Image from 'next/image';

export const Modal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, removeItemToCart } = useCart();

  const handleRemoveItemToCart = (id: number) => {
    removeItemToCart(id);
  };

  const cartTotalItems = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const cartTotalPrice = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const handleBuyProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/checkout', {
        cart,
      });

      const { checkoutUrl } = data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao comprar o produto';

      alert(errorMessage);
    }
  };

  return (
    <Dialog.Portal>
      <S.Overlay />
      <S.Content>
        <S.Title>Sacola de compras</S.Title>
        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>
        {cart.length > 0 ? (
          cart.map((item) => (
            <S.ProductCard key={item.product.id}>
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                width={94}
                height={94}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <S.ProductActions>
                <S.ProductInfos>
                  <span>{item.product.name}</span>
                  <p>{formatPrice(item.product.price * item.quantity)}</p>
                </S.ProductInfos>
                <button onClick={() => handleRemoveItemToCart(item.product.id)}>
                  Remover
                </button>
              </S.ProductActions>
            </S.ProductCard>
          ))
        ) : (
          <S.EmptyCart>Sua sacola está vazia</S.EmptyCart>
        )}

        {cart.length > 0 && (
          <S.Footer>
            <S.FooterInfos>
              <S.BaseFooterTotal>
                <span>Quantidade</span>
                <span>{cartTotalItems}</span>
              </S.BaseFooterTotal>
              <S.FooterTotal>
                <span>Total</span>
                <span>{formatPrice(cartTotalPrice)}</span>
              </S.FooterTotal>
            </S.FooterInfos>
            <button onClick={handleBuyProduct} disabled={isLoading}>
              Finalizar compra
            </button>
          </S.Footer>
        )}
      </S.Content>
    </Dialog.Portal>
  );
};
