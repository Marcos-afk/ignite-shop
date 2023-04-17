import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@styles/index';

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
});

export const Content = styled(Dialog.Content, {
  overflow: 'auto',
  height: '100%',
  width: '28rem',
  padding: '2.5rem',
  background: '$gray800',
  position: 'fixed',
  top: 0,
  right: 0,
});

export const Title = styled(Dialog.Title, {
  fontSize: '$lg',
  fontWeight: 'bold',
  lineHeight: '160%',
  marginTop: '2rem',
  marginBottom: '1.875rem',
});

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray300',

  '&:hover': {
    color: '$gray100',
    transition: 'color 0.1s',
  },
});

export const ProductCard = styled('div', {
  display: 'flex',
  gap: '1.5rem',

  img: {
    objectFit: 'contain',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
  },

  marginBottom: '0.875rem',
});

export const ProductActions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',

  button: {
    fontSize: '$md',
    background: 'transparent',
    border: 0,
    color: '$green300',
  },
});

export const ProductInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.125rem',

  span: {
    fontSize: '$md',
    color: '$gray300',
    lineHeight: '160%',
  },

  p: {
    fontSize: '$md',
    color: '$white',
    lineHeight: '160%',
  },
});

export const EmptyCart = styled('span', {
  fontSize: '$xl',
  color: '$gray300',
  fontWeight: 'bold',
  lineHeight: '160%',
});

export const Footer = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  position: 'fixed',
  bottom: '1rem',

  button: {
    width: '23rem',
    background: '$green500',
    border: 0,
    color: '$white',
    padding: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    borderRadius: 8,

    '&:not(:disabled):hover': {
      background: '$green300',
      transition: 'background 0.2s',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
});

export const FooterInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const BaseFooterTotal = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: '160%',
  color: '$gray100',
});

export const FooterTotal = styled(BaseFooterTotal, {
  fontSize: '$md',
  fontWeight: 'bold',
});
