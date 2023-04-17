import { Header } from '@components/Header';
import { CartProvider } from '@contexts/Cart';
import { globalStyles } from '@styles/global';
import * as S from '@styles/pages/app';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

globalStyles();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <S.Container>
        <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
        <Header />
        <Component {...pageProps} />
      </S.Container>
    </CartProvider>
  );
};

export default App;
