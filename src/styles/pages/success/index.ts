import { styled } from '@stitches/react';

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
});

export const ImageContainer = styled('div', {
  width: '100%',
  marginBottom: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '9999px',
    marginRight: '-1.2rem',
    boxShadow: '0 0 0 0.1px #202024',
  },
});
