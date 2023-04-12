import Explorer from '@assets/shirts/explorer.png';
import * as S from '@styles/pages/product';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Product = () => {
  const { query } = useRouter();

  return (
    <S.Container>
      <S.ImageContainer>
        <Image
          src={Explorer}
          alt="Explorer"
          width={520}
          height={480}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </S.ImageContainer>
      <S.ProductDetails>
        <h1>Explorer</h1>
        <span>R$ 79,90</span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Reprehenderit placeat voluptates ducimus mollitia consequuntur iusto,
          autem est adipisci asperiores laborum laudantium esse, ipsam ex
          facilis aliquid praesentium nesciunt nobis vel?
        </p>
        <button>Comprar agora</button>
      </S.ProductDetails>
    </S.Container>
  );
};

export default Product;
