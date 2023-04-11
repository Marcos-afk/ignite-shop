import 'keen-slider/keen-slider.min.css';

import Explorer from '@assets/shirts/explorer.png';
import IgniteLab from '@assets/shirts/IgniteLab.png';
import Igniter from '@assets/shirts/igniter.png';
import Marathon from '@assets/shirts/Marathon.png';
import * as S from '@styles/pages/home';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <S.Container ref={sliderRef} className="keen-slider">
      <S.Products className="keen-slider__slide">
        <Image src={Explorer} alt="Explorer" width={520} height={480} />
        <footer>
          <strong>Explorer</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Products>
      <S.Products className="keen-slider__slide">
        <Image src={Marathon} alt="Marathon" width={520} height={480} />
        <footer>
          <strong>Marathon</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Products>
      <S.Products className="keen-slider__slide">
        <Image src={Igniter} alt="Igniter" width={520} height={480} />
        <footer>
          <strong>Marathon</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Products>
      <S.Products className="keen-slider__slide">
        <Image src={IgniteLab} alt="IgniteLab" width={520} height={480} />
        <footer>
          <strong>Marathon</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Products>
    </S.Container>
  );
}
