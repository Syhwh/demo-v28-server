import { Request, Response } from 'express';
import Stripe from 'stripe';

import { FRONTEND_URL, STRIPE_SECRET_KEY } from '../../config/config';

const stripe = new Stripe(`${STRIPE_SECRET_KEY}`, {});

const productsDB = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 199,
  },
  {
    id: 2,
    name: 'Wireless Keyboard',
    price: 79,
  },
  {
    id: '3',
    name: 'Cap',
    price: 50,
  },
];

export const checkout = async (req: Request, res: Response) => {
  const { order } = req.body;

  // query the database for the product details
  console.log({
    order,
  });
  const createProductOrder = (id: string, quantity: number) => {
    const product = productsDB.find((product) => product.id == id);
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        },
        unit_amount: product?.price * 100,
      },
      quantity,
    };
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: order.map(
      ({ productId, quantity }: { productId: string; quantity: number }) =>
        createProductOrder(productId, quantity),
    ),
    mode: 'payment',
    // success_url: `${FRONTEND_URL}/success`,
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${FRONTEND_URL}/cancel`,
  });

  console.log({
    session,
  });

  res.status(200).json({ id: session.id, url: session.url });
};

export const success = async (req: Request, res: Response) => {
  const sessionId = req.query.session_id as string;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  //update database with the order details
  console.log('DAtabases successfully transaction');
  console.log({
    session,
  });

  res.redirect(`${FRONTEND_URL}/success`);
};
