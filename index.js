const express = require('express')
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const app = express()
const port = 4646

console.log(process.env.STRIPE_KEY)
app.get('/', async (req, res) => {
    const priceId = 'price_1JI97dHRYPXyTA4EvlJwWPxL';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: 'cus_JwhWM0o7r0J0jq',
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 30
      },
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://example.com/canceled.html',
    });

    res.send(session)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})