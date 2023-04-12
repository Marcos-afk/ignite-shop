import Logo from '@assets/logo.svg';
import * as S from '@styles/components/header';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <S.Container>
      <Head>
        <title>Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Ignite-simbol.svg" />
      </Head>
      <Link href="/">
        <Image src={Logo} alt="Ignite Shop logo" />
      </Link>
    </S.Container>
  );
};
