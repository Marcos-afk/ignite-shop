import { CartDTO } from '@dtos/Cart';
import { stripe } from '@lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripeCheckout = async (req: NextApiRequest, res: NextApiResponse) => {
  const cart = req.body.cart as CartDTO[];

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  if (cart.length < 1) {
    return res.status(400).json({ message: 'PriceId é requerido' });
  }

  const line_items = cart.map((item) => {
    return {
      price: item.product.defaultPriceId,
      quantity: item.quantity,
    };
  });

  const cancel_url = process.env.STRIPE_CANCEL_URL as string;
  const success_url = process.env.STRIPE_SUCCESS_URL as string;

  const response = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    cancel_url,
    success_url,
  });

  return res.status(200).json({
    checkoutUrl: response.url,
  });
};

export default stripeCheckout;
