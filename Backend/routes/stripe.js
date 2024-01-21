const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()



router.post('/create-checkout-session', async (req, res) => {
  console.log(req.body);
  //   const price = await stripe.prices.create({
  //   unit_amount: 2000, // amount in cents
  //   currency: 'usd',
  //   product_data: {
  //     name: req.body.name,
  //     price: req.body.name
  //     // Other product details
  //   },
  // })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.body.title,

          },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://spontaneous-custard-93743e.netlify.app/`,
    cancel_url: `https://spontaneous-custard-93743e.netlify.app/`,
  });

  return res.json({ url: session.url });

});

module.exports = router;