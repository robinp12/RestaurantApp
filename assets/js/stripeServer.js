import Stripe from "@stripe/stripe-js";

const stripe = new Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const { default: Axios } = require("axios");
const YOUR_DOMAIN = "http://localhost:3000/checkout";

export default async (req, res) => {
  await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  res.json({ id: session.id });
};
