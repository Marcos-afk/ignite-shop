import { stripe } from '@lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripeCheckout = async (req: NextApiRequest, res: NextApiResponse) => {
  const priceId = req.body.priceId as string;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  if (!priceId) {
    return res.status(400).json({ message: 'PriceId é requerido' });
  }

  const cancel_url = process.env.STRIPE_CANCEL_URL as string;
  const success_url = process.env.STRIPE_SUCCESS_URL as string;

  const response = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    cancel_url,
    success_url,
  });

  return res.status(200).json({
    checkoutUrl: response.url,
  });
};

export default stripeCheckout;
