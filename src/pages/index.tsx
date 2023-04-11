import Explorer from '@assets/shirts/explorer.png';
import Marathon from '@assets/shirts/Marathon.png';
import * as S from '@styles/pages/home';
import Image from 'next/image';

export default function Home() {
  return (
    <S.Container>
      <S.Products>
        <Image src={Explorer} alt="Explorer" width={520} height={480} />
        <footer>
          <strong>Explorer</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Products>
      <S.Products>
        <Image src={Marathon} alt="Marathon" width={520} height={480} />
        <footer>
          <strong>Marathon</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Products>
    </S.Container>
  );
}
