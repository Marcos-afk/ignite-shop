import 'keen-slider/keen-slider.min.css';

import { ProductDTO } from '@dtos/product';
import { stripe } from '@lib/stripe';
import { Handbag } from '@phosphor-icons/react';
import * as S from '@styles/pages/home';
import { formatPrice } from '@utils/formatPrice';
import { useKeenSlider } from 'keen-slider/react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

interface HomeProps {
  products: ProductDTO[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <S.Container ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <S.Products className="keen-slider__slide">
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
            <footer>
              <S.ProductInfos>
                <strong>{product.name}</strong>
                <span>{formatPrice(product.price)}</span>
              </S.ProductInfos>
              <S.Cart>
                <Handbag size={24} color="#ffff" />
              </S.Cart>
            </footer>
          </S.Products>
        </Link>
      ))}
    </S.Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount as number,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24,
  };
};
