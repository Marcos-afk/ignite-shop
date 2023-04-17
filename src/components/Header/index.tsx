import Logo from '@assets/logo.svg';
import { Modal } from '@components/Modal';
import { useCart } from '@hooks/useCart';
import { Handbag } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as S from '@styles/components/header';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  const { cart } = useCart();

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

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <S.Cart>
            <S.IconContainer>
              <Handbag size={24} color="#ffff" />
            </S.IconContainer>
            {cart.length > 0 && <S.CartCounter>{cart.length}</S.CartCounter>}
          </S.Cart>
        </Dialog.Trigger>
        <Modal />
      </Dialog.Root>
    </S.Container>
  );
};
