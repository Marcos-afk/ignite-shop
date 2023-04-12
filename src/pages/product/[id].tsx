import { useState } from 'react';

import { stripe } from '@lib/stripe';
import * as S from '@styles/pages/product';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Stripe from 'stripe';

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
  };
}

const Product = ({ product }: ProductProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  const handleBuyProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
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
    <S.Container>
      <S.ImageContainer>
        <Image
          src={product.imageUrl}
          alt="Explorer"
          width={520}
          height={480}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </S.ImageContainer>
      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={isLoading} type="button" onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </S.ProductDetails>
    </S.Container>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'prod_NhD9pveCRioPOT',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format((price.unit_amount as number) / 100),
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};
