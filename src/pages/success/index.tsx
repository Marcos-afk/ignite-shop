import { stripe } from '@lib/stripe';
import * as S from '@styles/pages/success';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

interface SuccessProps {
  costumerName: string;
  products: {
    name: string;
    imageUrl: string;
    quantity: number;
  }[];
}

const Success = (props: SuccessProps) => {
  const totalItems = props.products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <S.Container>
        <S.ImageContainer>
          {props.products.map((product) => (
            <Image
              key={product.name}
              src={product.imageUrl}
              alt={product.name}
              width={94}
              height={94}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          ))}
        </S.ImageContainer>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul <strong>{props.costumerName}</strong>, sua compra de{' '}
          <strong>{totalItems} </strong>camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </S.Container>
    </>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string;

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const lineItems = response.line_items?.data as Stripe.LineItem[];

  const customerName = response.customer_details?.name;

  const products = lineItems.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
    };
  });

  return {
    props: {
      costumerName: customerName,
      products,
    },
  };
};
