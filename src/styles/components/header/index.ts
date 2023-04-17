import { styled } from '@styles/index';

export const Container = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
});

export const Cart = styled('button', {
  width: '3rem',
  height: '3rem',
  border: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 6,
  background: '$gray800',
  padding: '0.5rem 0.75rem',

  '&:hover': {
    background: 'rgba(0, 0, 0, 0.8)',
  },
});

export const CartCounter = styled('span', {
  padding: '0.1rem 0.5rem',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  lineHeight: '160%',
  color: '$white',
  backgroundColor: '$green500',
  borderRadius: '9999px',
  marginTop: '-2.5rem',
});

export const IconContainer = styled('div', {
  width: '100%',
});
