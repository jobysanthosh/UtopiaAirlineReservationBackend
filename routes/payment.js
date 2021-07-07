// const CONFIG = require('../config');

const stripe = require("stripe")('sk_test_MYDs1ZdsDZ2QcbhY7YkwaDuf009s6McM4m');
const stripeChargeCallback = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  };
  const paymentApi = app => {
    app.get("/stripe", (req, res) => {
      res.send({
        message: "Hello Stripe checkout server!",
        timestamp: new Date().toISOString()
      });
    });
    app.post("/pay", (req, res) => {
      const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd"
      };
      stripe.charges.create(body, stripeChargeCallback(res));
  }); 
   return app;
  };
  module.exports = paymentApi;