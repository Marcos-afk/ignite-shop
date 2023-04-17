import { useState } from 'react';

import { ProductDTO } from '@dtos/product';
import { useCart } from '@hooks/useCart';
import { stripe } from '@lib/stripe';
import * as S from '@styles/pages/product';
import { formatPrice } from '@utils/formatPrice';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Stripe from 'stripe';

interface ProductProps {
  product: ProductDTO;
}

const Product = ({ product }: ProductProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNewItemToCart } = useCart();
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  const handleAddProductToCart = () => {
    setIsLoading(true);
    addNewItemToCart(product, 1);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>{product.name + '|' + 'Ignite Shop'}</title>
      </Head>
      <S.Container>
        <S.ImageContainer>
          <Image
            src={product.imageUrl}
            alt={product.name}
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
          <span>{formatPrice(product.price)}</span>
          <p>{product.description}</p>
          <button
            disabled={isLoading}
            type="button"
            onClick={handleAddProductToCart}
          >
            Colocar na sacola
          </button>
        </S.ProductDetails>
      </S.Container>
    </>
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
  const productId = params?.id as string;
  let product: Stripe.Product;

  try {
    product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
    });
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: price.unit_amount as number,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};
