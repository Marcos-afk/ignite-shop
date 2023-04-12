import { stripe } from '@lib/stripe';
import * as S from '@styles/pages/success';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

interface SuccessProps {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

const Success = (props: SuccessProps) => {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <S.Container>
        <h1>Compra efetuada</h1>
        <S.ImageContainer>
          <Image
            src={props.product.imageUrl}
            alt={props.product.name}
            width={520}
            height={480}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </S.ImageContainer>

        <p>
          Uhuul <strong>{props.costumerName}</strong>, sua{' '}
          <strong>{props.product.name}</strong> já está a caminho da sua casa.
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

  const customerName = response.customer_details?.name;
  const product = response.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      costumerName: customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
