import { Header } from '@components/Header';
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
    <S.Container>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Header />
      <Component {...pageProps} />
    </S.Container>
  );
};

export default App;
