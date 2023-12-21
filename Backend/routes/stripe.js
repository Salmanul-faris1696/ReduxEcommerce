const express = require("express");
const Stripe = require("stripe");

require ("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()



router.post('/create-checkout-session', async (req, res) => {
  console.log(req.body);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.body.name,
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

  return res.json({url: session.url});
  
});

module.exports = router;